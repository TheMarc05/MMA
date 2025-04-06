using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackENDiTEC.Models
{
    public class CartItem
    {
        public CartItem()
        {
            Cart = null!;
            Product = null!;
        }

        public int Id { get; set; }

        public int CartId { get; set; }
        
        [JsonIgnore]
        public virtual Cart Cart { get; set; }

        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    }
} 