using Microsoft.EntityFrameworkCore.Migrations;

namespace StoreOrganizer.Migrations
{
    public partial class CreateTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    StoreNumber = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    DepartmentNumber = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    StoreDataModelId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departments_Stores_StoreDataModelId",
                        column: x => x.StoreDataModelId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Goods",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    IdentityNumber = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<double>(nullable: false),
                    StoreDataModelId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Goods_Stores_StoreDataModelId",
                        column: x => x.StoreDataModelId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    IdentityNumber = table.Column<string>(nullable: true),
                    Salary = table.Column<double>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    DepartmentDataModelId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Departments_DepartmentDataModelId",
                        column: x => x.DepartmentDataModelId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Departments_StoreDataModelId",
                table: "Departments",
                column: "StoreDataModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentDataModelId",
                table: "Employees",
                column: "DepartmentDataModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Goods_StoreDataModelId",
                table: "Goods",
                column: "StoreDataModelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Goods");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Stores");
        }
    }
}
