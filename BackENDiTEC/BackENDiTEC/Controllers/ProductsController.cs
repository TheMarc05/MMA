using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackENDiTEC.Models;
using BackENDiTEC.Models.Db;

namespace BackENDiTEC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obține toate produsele
        /// </summary>
        /// <returns>Lista de produse</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        /// <summary>
        /// Obține produsele după stil
        /// </summary>
        /// <param name="productStyle">Stilul produsului</param>
        /// <returns>Lista de produse filtrată după stil</returns>
        [HttpGet("style/{productStyle}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByStyle(string productStyle)
        {
            return await _context.Products
                .Where(p => p.ProductStyle == productStyle)
                .Select(p => new Product
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    ProductStyle = p.ProductStyle,
                    Material = p.Material,
                    Color = p.Color,
                    ImageUrl = p.ImageUrl,
                    HoverImageUrl = p.HoverImageUrl,
                    Description = p.Description,
                    XS = p.XS,
                    S = p.S,
                    M = p.M,
                    L = p.L,
                    XL = p.XL,
                    ShoeSize = p.ShoeSize
                })
                .ToListAsync();
        }

        /// <summary>
        /// Obține un produs după ID
        /// </summary>
        /// <param name="id">ID-ul produsului</param>
        /// <returns>Produsul găsit</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        /// <summary>
        /// Creează un produs nou
        /// </summary>
        /// <param name="product">Produsul de creat</param>
        /// <returns>Produsul creat</returns>
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        /// <summary>
        /// Actualizează un produs existent
        /// </summary>
        /// <param name="id">ID-ul produsului</param>
        /// <param name="product">Datele actualizate ale produsului</param>
        /// <param name="size">Mărimea pentru care se face actualizarea stocului</param>
        /// <returns>NoContent dacă actualizarea a reușit</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product product, [FromQuery] string size)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            if (!string.IsNullOrEmpty(size))
            {
                switch (size.ToUpper())
                {
                    case "XS":
                        product.XS = Math.Max(0, product.XS - 1);
                        break;
                    case "S":
                        product.S = Math.Max(0, product.S - 1);
                        break;
                    case "M":
                        product.M = Math.Max(0, product.M - 1);
                        break;
                    case "L":
                        product.L = Math.Max(0, product.L - 1);
                        break;
                    case "XL":
                        product.XL = Math.Max(0, product.XL - 1);
                        break;
                    case "SHOESIZE":
                        product.ShoeSize = Math.Max(0, product.ShoeSize - 1);
                        break;
                }
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Șterge un produs
        /// </summary>
        /// <param name="id">ID-ul produsului de șters</param>
        /// <returns>NoContent dacă ștergerea a reușit</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
