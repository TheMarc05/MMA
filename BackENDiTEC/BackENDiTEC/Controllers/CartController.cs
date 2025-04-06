using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackENDiTEC.Models;
using BackENDiTEC.Models.Db;

namespace BackENDiTEC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            return Ok(cart);
        }

        [HttpPost("{userId}/items")]
        public async Task<IActionResult> AddItem(int userId, [FromBody] AddCartItemRequest request)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
            }

            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity = request.Quantity;
                existingItem.TotalPrice = existingItem.Quantity * existingItem.UnitPrice;
            }
            else
            {
                cart.Items.Add(new CartItem
                {
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,
                    UnitPrice = product.Price,
                    TotalPrice = product.Price * request.Quantity
                });
            }

            cart.TotalAmount = cart.Items.Sum(i => i.TotalPrice);
            cart.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(cart);
        }

        [HttpPut("{userId}/items/{itemId}")]
        public async Task<IActionResult> UpdateItem(int userId, int itemId, [FromBody] UpdateCartItemRequest request)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
            if (item == null)
            {
                return NotFound("Item not found");
            }

            item.Quantity = request.Quantity;
            item.TotalPrice = item.Quantity * item.UnitPrice;
            cart.TotalAmount = cart.Items.Sum(i => i.TotalPrice);
            cart.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(cart);
        }

        [HttpDelete("{userId}/items/{itemId}")]
        public async Task<IActionResult> RemoveItem(int userId, int itemId)
        {
            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
            if (item == null)
            {
                return NotFound("Item not found");
            }

            cart.Items.Remove(item);
            cart.TotalAmount = cart.Items.Sum(i => i.TotalPrice);
            cart.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(cart);
        }
    }

    public class AddCartItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class UpdateCartItemRequest
    {
        public int Quantity { get; set; }
    }
} 