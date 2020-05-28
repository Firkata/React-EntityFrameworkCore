using Microsoft.EntityFrameworkCore.Migrations;

namespace StoreOrganizer.Migrations
{
    public partial class ChangeFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Departments_Stores_StoreDataModelId",
                table: "Departments");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentDataModelId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Goods_Stores_StoreDataModelId",
                table: "Goods");

            migrationBuilder.DropIndex(
                name: "IX_Goods_StoreDataModelId",
                table: "Goods");

            migrationBuilder.DropIndex(
                name: "IX_Employees_DepartmentDataModelId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Departments_StoreDataModelId",
                table: "Departments");

            migrationBuilder.DropColumn(
                name: "StoreDataModelId",
                table: "Goods");

            migrationBuilder.DropColumn(
                name: "DepartmentDataModelId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "StoreDataModelId",
                table: "Departments");

            migrationBuilder.AddColumn<string>(
                name: "StoreId",
                table: "Goods",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StoreId",
                table: "Departments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StoreId",
                table: "Goods");

            migrationBuilder.DropColumn(
                name: "StoreId",
                table: "Departments");

            migrationBuilder.AddColumn<string>(
                name: "StoreDataModelId",
                table: "Goods",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DepartmentDataModelId",
                table: "Employees",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StoreDataModelId",
                table: "Departments",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Goods_StoreDataModelId",
                table: "Goods",
                column: "StoreDataModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentDataModelId",
                table: "Employees",
                column: "DepartmentDataModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_StoreDataModelId",
                table: "Departments",
                column: "StoreDataModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Departments_Stores_StoreDataModelId",
                table: "Departments",
                column: "StoreDataModelId",
                principalTable: "Stores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentDataModelId",
                table: "Employees",
                column: "DepartmentDataModelId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Goods_Stores_StoreDataModelId",
                table: "Goods",
                column: "StoreDataModelId",
                principalTable: "Stores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
