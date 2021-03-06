﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace StoreOrganizer.Migrations
{
    public partial class CreateDepartmentFieldEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentDataModelId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_DepartmentDataModelId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DepartmentDataModelId",
                table: "Employees");

            migrationBuilder.AddColumn<string>(
                name: "DepartmentId",
                table: "Employees",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentId",
                table: "Employees",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_DepartmentId",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Employees");

            migrationBuilder.AddColumn<string>(
                name: "DepartmentDataModelId",
                table: "Employees",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentDataModelId",
                table: "Employees",
                column: "DepartmentDataModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentDataModelId",
                table: "Employees",
                column: "DepartmentDataModelId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
