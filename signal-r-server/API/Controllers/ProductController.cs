using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("/product")]
    [ApiController]
    public class ProductController(ApplicationDbContext _dbContext) : ControllerBase
    {
        [HttpGet]
        public IActionResult Index()
        {
            return Ok(_dbContext.Product);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Product product) {
            _dbContext.Product.Add(product);
            _dbContext.SaveChanges();
            return Ok("Ok");
        }

        [HttpPut]
        public IActionResult Update([FromBody] Product product)
        {
            _dbContext.Product.Update(product);
            _dbContext.SaveChanges();
            return Ok("Ok");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _dbContext.Product.Find(id);
            if (product != null)
            {
                _dbContext.Product.Remove(product);
                _dbContext.SaveChanges();
            }
            return Ok("Ok");
        }
    }
}
