using Microsoft.EntityFrameworkCore;
using MyApp.Models;

namespace MyApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<vevo> vevo { get; set; }
        public DbSet<Termek> Termekek { get; set; }
        public DbSet<Rendeles> rendelesek { get; set; }
        public DbSet<RendelesTetel> rendeles_tetelek { get; set; }
        public DbSet<Kategoria> Kategoriak { get; set; } // 🔹 ÚJ: Kategóriák tábla

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<vevo>()
                .HasIndex(u => u.email)
                .IsUnique(); // Az email egyedi kell, hogy legyen

            modelBuilder.Entity<Rendeles>()
                .HasMany(r => r.Termekek)
                .WithOne(t => t.Rendeles)
                .HasForeignKey(t => t.rendeles_id);

            modelBuilder.Entity<Kategoria>()
                .HasMany(k => k.Termekek)
                .WithOne(t => t.Kategoria)
                .HasForeignKey(t => t.kategoria_id); // 🔹 Kapcsolat beállítása
        }
    }
}
