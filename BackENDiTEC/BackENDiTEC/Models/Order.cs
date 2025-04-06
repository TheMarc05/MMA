using System.ComponentModel.DataAnnotations;

namespace BackENDiTEC.Models
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public string OrderNumber { get; set; } = string.Empty;

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        public string Status { get; set; } = string.Empty; // Pending, Processing, Shipped, Delivered, Cancelled

        [Required]
        public decimal TotalAmount { get; set; }

        public string? ShippingAddress { get; set; }

        public string? BillingAddress { get; set; }

        public string? PaymentMethod { get; set; }

        public string? Notes { get; set; }

        // Relația cu utilizatorul
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        // Relația cu produsele din comandă
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
} 