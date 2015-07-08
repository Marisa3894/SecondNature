using SecondNature.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SecondNature.API
{
    public class ProductsTooController : ApiController
    {
        private ApplicationDbContext _db = new ApplicationDbContext();

        public IList<ProductToo> GetProductsToo()
        {
            return _db.ProductsToo.ToList();
        }

        public ProductToo Get(int id)
        {
            return _db.ProductsToo.Find(id);
        }

        public HttpResponseMessage PostProductsToo(ProductToo productToo)
        {

            if (ModelState.IsValid)
            {
                if (productToo.Id == 0)
                {
                    _db.ProductsToo.Add(productToo);
                    _db.SaveChanges();
                }
                else
                {
                    var original = _db.ProductsToo.Find(productToo.Id);
                    original.Intake = productToo.Intake;
                    original.Name = productToo.Name;
                    _db.SaveChanges();
                }

                return Request.CreateResponse(HttpStatusCode.Created, productToo);
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, this.ModelState);
        }


        public void Delete(int id)
        {
            var original = _db.ProductsToo.Find(id);
            _db.ProductsToo.Remove(original);
            _db.SaveChanges();
        }
    }
}
