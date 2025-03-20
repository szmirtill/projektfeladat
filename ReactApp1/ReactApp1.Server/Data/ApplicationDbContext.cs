using Microsoft.EntityFrameworkCore;
using MyApp.Models;

namespace MyApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<vevo> vevo { get; set; }
        public DbSet<Termek> Termekek { get; set; }  // 🔹 Hozzáadtuk a Termekek táblát

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<vevo>()
                .HasIndex(u => u.email)
                .IsUnique(); // Az email egyedi kell, hogy legyen
        }
    }
}
