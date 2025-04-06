using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackENDiTEC.Models
{
    public class Cart
    {
        public Cart()
        {
            Items = new List<CartItem>();
        }

        public int Id { get; set; }

        public int UserId { get; set; }
        
        [JsonIgnore]
        public virtual User User { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        public virtual ICollection<CartItem> Items { get; set; }

        [Required]
        public decimal TotalAmount { get; set; } = 0;
    }
} 