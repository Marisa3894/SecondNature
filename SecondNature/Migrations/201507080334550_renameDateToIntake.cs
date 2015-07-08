namespace SecondNature.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class renameDateToIntake : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProductToos", "Intake", c => c.DateTime(nullable: false));
            DropColumn("dbo.ProductToos", "Date");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ProductToos", "Date", c => c.String());
            DropColumn("dbo.ProductToos", "Intake");
        }
    }
}
