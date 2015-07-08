using SecondNature.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SecondNature.API
{
    public class ProductsController : ApiController
    {
        private ApplicationDbContext _db = new ApplicationDbContext();

        public IList<Product> GetProducts()
        {
            return _db.Products.ToList();
        }

        public Product Get(int id)
        {
            return _db.Products.Find(id);
        }

        public HttpResponseMessage PostProducts(Product product)
        {

            if (ModelState.IsValid)
            {
                if (product.Id == 0)
                {
                    _db.Products.Add(product);
                    _db.SaveChanges();
                }
                else
                {
                    var original = _db.Products.Find(product.Id);
                    original.Image = product.Image;
                    original.Name = product.Name;
                    original.Filling = product.Filling;
                    original.Fabric = product.Fabric;
                    original.Price = product.Price;
                    original.Description = product.Description;
                    _db.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.Created, product);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);
        }

        
        public void Delete(int id)
        {
            var original = _db.Products.Find(id);
            _db.Products.Remove(original);
            _db.SaveChanges();
        }
    }
}
