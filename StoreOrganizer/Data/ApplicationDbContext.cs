using Microsoft.EntityFrameworkCore;
using StoreOrganizer.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreOrganizer.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<EmployeeDataModel> Employees { get; set; }
        public DbSet<GoodDataModel> Goods { get; set; }
        public DbSet<DepartmentDataModel> Departments { get; set; }
        public DbSet<StoreDataModel> Stores { get; set; }

    }
}
