using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost;Database=TrainSignalR;Integrated Security=True;TrustServerCertificate=True");
        }

        public DbSet<Product> Product { get; set; } = null!;
    }
}
