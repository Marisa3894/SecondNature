using SecondNature.Models;
using System;
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


        //GET: api/SN
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/SN/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/SN
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT: api/SN/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE: api/SN/5
        //public void Delete(int id)
        //{
        //}
    }
}
