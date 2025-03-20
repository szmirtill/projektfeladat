namespace MyApp.Models
{
    public class Termek
    {
        public int Id { get; set; }
        public string Nev { get; set; } = string.Empty;
        public string Leiras { get; set; } = string.Empty;
        public decimal Ar { get; set; }
        public int KategoriaId { get; set; }
    }
}
