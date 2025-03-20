using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models
{
    public class Termek
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nev { get; set; } = string.Empty; // Név biztosan legyen

        [Required]
        public decimal Ar { get; set; } = 0; // Ár nem lehet null

        [Required]
        public int kategoria_id { get; set; } // 🔹 ÚJ: Kategória ID hozzáadása

        [ForeignKey("kategoria_id")]
        public Kategoria? Kategoria { get; set; } // 🔹 Kapcsolat a Kategoriak táblával
    }
}
