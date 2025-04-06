using System.ComponentModel.DataAnnotations;

namespace BackENDiTEC.Models
{
    public class UserProfile
    {
        public UserProfile()
        {
            Address = string.Empty;
            City = string.Empty;
            Country = string.Empty;
            PostalCode = string.Empty;
            Gender = string.Empty;
        }

        public int Id { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; } = null!;

        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }

        public bool EmailNotifications { get; set; } = true;
        public bool SMSNotifications { get; set; } = false;

        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
    }
} 