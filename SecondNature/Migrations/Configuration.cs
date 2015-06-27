namespace SecondNature.Migrations
{
    using SecondNature.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SecondNature.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SecondNature.Models.ApplicationDbContext context)
        {            
            var products = new Product[] {
                new Product {Image="", Name="Zafu", Price=49.00m, Filling="buckwheat", Fabric="print", Description=""},
                new Product {Image="", Name="Mini-Zab", Price=19.00m, Filling="cotton", Fabric="print", Description=""},
                new Product {Image="", Name="Zabouton", Price=59.00m, Filling="cotton", Fabric="solid", Description=""},
                new Product {Image="", Name="Neck Pillow", Price=29.00m, Filling="buckwheat", Fabric="solid", Description=""}
        };
            context.Products.AddOrUpdate(p => p.Name, products);

        }
    }
}
