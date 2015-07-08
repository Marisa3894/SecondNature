namespace SecondNature.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProductsToo : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProductToos",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Time = c.DateTime(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ProductToos");
        }
    }
}
