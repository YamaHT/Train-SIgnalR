using API.Data;
using API.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.SignalR
{
    public class ProductHub(ApplicationDbContext _dbContext) : Hub
    {
        public async Task GetProductsAsync()
        {
            var products = await _dbContext.Product.ToListAsync();
            await Clients.All.SendAsync("GetProducts", products);
        }
    }
}
