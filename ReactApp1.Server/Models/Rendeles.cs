using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models
{
    public class Rendeles
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int vevo_id { get; set; }

        [Required]
        public DateTime rendeles_datum { get; set; } = DateTime.Now;

        [Required]
        public string allapot { get; set; } = "Függőben";

        public List<RendelesTetel> Termekek { get; set; } = new List<RendelesTetel>();
    }
}
