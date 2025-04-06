using System.ComponentModel.DataAnnotations;

namespace BackENDiTEC.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public decimal Price { get; set; }

        [StringLength(500)]
        public string Description { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;
        
        public string? HoverImageUrl { get; set; }

        public string ProductStyle { get; set; } = string.Empty;

        public string? Material { get; set; }

        public string? Color { get; set; } 

        public int XL { get; set; }

        public int L { get; set; }

        public int M { get; set; }

        public int S { get; set; }

        public int XS { get; set; }

        public int ShoeSize { get; set; }

        // Proprietate calculată pentru quantity
        public int Quantity
        {
            get
            {
                // Dacă este un produs de tip papuc, returnează ShoeSize
                if (ProductStyle.ToLower().Contains("shoe") || ProductStyle.ToLower().Contains("papuc"))
                {
                    return ShoeSize;
                }
                
                // Altfel, calculează suma mărimilor pentru haine
                return XS + S + M + L + XL;
            }
        }
    }
} 