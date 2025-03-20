using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace MyApp.Models
{
    public class Kategoria
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nev { get; set; } = string.Empty; // Kategória neve

        public List<Termek>? Termekek { get; set; } // Kapcsolat a termékekkel
    }
}
