namespace SecondNature.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Date : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProductToos", "Date", c => c.String());
            DropColumn("dbo.ProductToos", "Time");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductToos", "Time", c => c.DateTime(nullable: false));
            DropColumn("dbo.ProductToos", "Date");
        }
    }
}
