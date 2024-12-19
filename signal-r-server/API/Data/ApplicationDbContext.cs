using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=192.168.1.157,1433;Database=AdvancedNetTraining;User Id=sa;Password=Tinhroz123@;Integrated Security=False;TrustServerCertificate=True");
        }

        public DbSet<Product> Product { get; set; } = null!;
    }
}
