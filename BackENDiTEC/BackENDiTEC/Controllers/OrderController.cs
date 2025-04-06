using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackENDiTEC.Models;
using BackENDiTEC.Models.Db;

namespace BackENDiTEC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private static readonly string[] ValidStatuses = new[] { "Pending", "Processing", "Shipped", "Delivered", "Cancelled" };

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserOrders(int userId)
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrder(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
            {
                return NotFound("Order not found");
            }

            return Ok(order);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        {
            // Verificăm dacă utilizatorul există
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Verificăm dacă coșul există și are produse
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == request.UserId);

            if (cart == null || !cart.Items.Any())
            {
                return BadRequest("Cart is empty");
            }

            // Creăm comanda
            var order = new Order
            {
                UserId = request.UserId,
                OrderNumber = GenerateOrderNumber(),
                OrderDate = DateTime.UtcNow,
                Status = "Pending", // Status implicit
                TotalAmount = cart.TotalAmount,
                ShippingAddress = request.ShippingAddress,
                BillingAddress = request.BillingAddress,
                PaymentMethod = request.PaymentMethod,
                Notes = request.Notes
            };

            // Adăugăm produsele din coș în comandă
            foreach (var cartItem in cart.Items)
            {
                order.OrderItems.Add(new OrderItem
                {
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity,
                    UnitPrice = cartItem.UnitPrice,
                    TotalPrice = cartItem.TotalPrice
                });
            }

            _context.Orders.Add(order);

            // Ștergem coșul după ce am creat comanda
            _context.Carts.Remove(cart);

            await _context.SaveChangesAsync();
            return Ok(order);
        }

        [HttpPut("{orderId}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int orderId, [FromBody] UpdateOrderStatusRequest request)
        {
            if (!ValidStatuses.Contains(request.Status))
            {
                return BadRequest($"Invalid status. Valid statuses are: {string.Join(", ", ValidStatuses)}");
            }

            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return NotFound("Order not found");
            }

            order.Status = request.Status;
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        [HttpGet("statuses")]
        public IActionResult GetValidStatuses()
        {
            return Ok(ValidStatuses);
        }

        private string GenerateOrderNumber()
        {
            return $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 8)}";
        }
    }

    public class CreateOrderRequest
    {
        public int UserId { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public string BillingAddress { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }

    public class UpdateOrderStatusRequest
    {
        public string Status { get; set; } = string.Empty;
    }
} 