using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models
{
    public class RendelesTetel
    {
        [Key]
        public int Id { get; set; }
        
        [ForeignKey("Rendeles")]
        public int rendeles_id { get; set; }

        [ForeignKey("Termek")]
        public int termek_id { get; set; }

        public int mennyiseg { get; set; }

        public int osszeg { get; set; }  // 🔹 ÚJ: A tétel összértéke

        public Rendeles? Rendeles { get; set; }
        public Termek? Termek { get; set; }
    }
}
