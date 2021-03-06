namespace SecondNature.Migrations
{
    using Microsoft.AspNet.Identity.EntityFramework;
    using SecondNature.Models;
    using System.Data.Entity.Migrations;
    using Microsoft.AspNet.Identity;
    using System.Security.Claims;
    using System;

    internal sealed class Configuration : DbMigrationsConfiguration<SecondNature.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SecondNature.Models.ApplicationDbContext context)
        {
            var user = new ApplicationUser
            {
                //user seed data
                UserName = "marisa.reilly@outlook.com",
                Email = "marisa.reilly@outlook.com",
                FirstName = "Marisa",
                LastName = "Reilly",
            };

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new ApplicationUserManager(userStore);

            if (userManager.FindByName(user.UserName) == null)
            {
                userManager.Create(user, "Secret123!");
                userManager.AddClaim(user.Id, new Claim("Admin", "true"));
            }

            var products = new Product[] {
                new Product {Image="http://www.stillsitting.com/library/images/coverZafu.jpg", Name="Zafu", Price=49.00m, Filling="buckwheat", Fabric="print", Description="Product description goes here ...", InventoryDate=DateTime.Now},
                new Product {Image="http://d17dfdys9mu8rp.cloudfront.net/large/4f55190e3af9a.jpg", Name="Mini-Zab", Price=19.00m, Filling="cotton", Fabric="print", Description="Product description goes here...", InventoryDate=DateTime.Now},
                new Product {Image="https://www.pillowcompany.com/images/pillows/zabuton-zoom.jpg", Name="Zabouton", Price=59.00m, Filling="cotton", Fabric="solid", Description="Product description goes here...", InventoryDate=DateTime.Now},
                new Product {Image="http://www.secondnaturepillow.com/images/albums/NewAlbum_28ac1/tn_480_3pil3.jpg.jpg", Name="Neck Pillow", Price=29.00m, Filling="buckwheat", Fabric="solid", Description="Product description goes here...", InventoryDate=DateTime.Now}
        };
            context.Products.AddOrUpdate(p => new { p.Image, p.Name, p.Filling, p.Fabric, p.Price, p.Description }, products);
        }
    }
}
