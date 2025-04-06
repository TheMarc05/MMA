using System.Diagnostics;
using BackENDiTEC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using BackENDiTEC.Areas.Identity.Data;
using Microsoft.EntityFrameworkCore;
using BackENDiTEC.Models.Db;

namespace BackENDiTEC.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Swagger()
        {
            return Redirect("/swagger");
        }

        public IActionResult Index()
        {
            ViewData["UserID"] = User.FindFirst(ClaimTypes.Email)?.Value;
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        // Products Actions
        public async Task<IActionResult> Products()
        {
            var products = await _context.Products.ToListAsync();
            return View(products);
        }

        public async Task<IActionResult> ProductsCreateEdit(int? id)
        {
            if (id == null)
            {
                return View(new Product());
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        [HttpPost]
        public async Task<IActionResult> SaveProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return View("ProductsCreateEdit", product);
            }

            if (product.Id == 0)
            {
                _context.Add(product);
            }
            else
            {
                _context.Update(product);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Products));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Products));
        }

        // Orders Actions
        public async Task<IActionResult> Orders()
        {
            var orders = await _context.Orders
                .Include(o => o.User)
                .OrderByDescending(o => o.OrderDate)
                .ToListAsync();
            return View(orders);
        }

        public async Task<IActionResult> OrdersCreateEdit(int? id)
        {
            ViewBag.Products = await _context.Products.ToListAsync();

            if (id == null)
            {
                return View(new Order { OrderDate = DateTime.Now });
            }

            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            return View(order);
        }

        [HttpPost]
        public async Task<IActionResult> SaveOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Products = await _context.Products.ToListAsync();
                return View("OrdersCreateEdit", order);
            }

            if (order.Id == 0)
            {
                _context.Add(order);
            }
            else
            {
                var existingOrder = await _context.Orders
                    .Include(o => o.OrderItems)
                    .FirstOrDefaultAsync(o => o.Id == order.Id);

                if (existingOrder == null)
                {
                    return NotFound();
                }

                // Remove existing items
                _context.OrderItems.RemoveRange(existingOrder.OrderItems);

                // Update order properties
                _context.Entry(existingOrder).CurrentValues.SetValues(order);

                // Add new items
                foreach (var item in order.OrderItems)
                {
                    existingOrder.OrderItems.Add(item);
                }
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Orders));
        }

        [HttpPost]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order != null)
            {
                _context.OrderItems.RemoveRange(order.OrderItems);
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Orders));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
