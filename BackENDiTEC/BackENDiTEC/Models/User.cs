using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackENDiTEC.Models
{
    public class User
    {
        public User()
        {
            Orders = new List<Order>();
        }

        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        public string LastName { get; set; } = string.Empty;

        public string PhoneNumber { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsActive { get; set; } = true;

        // Relații
        public virtual UserProfile? Profile { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; }
        
        [JsonIgnore]
        public virtual Cart? Cart { get; set; }
    }
} 