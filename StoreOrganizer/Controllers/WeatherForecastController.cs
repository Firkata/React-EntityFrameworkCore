using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using StoreOrganizer.Data;
using StoreOrganizer.Data.Models;

namespace StoreOrganizer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        protected ApplicationDbContext _context;

        public WeatherForecastController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<EmployeeDataModel> GetEmployees()
        {
            var result = new List<EmployeeDataModel>();
            result = _context.Employees.ToList();
            return result;
        }

        [HttpPost]
        [Route("[action]")]
        public IEnumerable<EmployeeDataModel> GetDepartmentEmployees([FromForm] string departmentId)
        {
            var result = new List<EmployeeDataModel>();
            result = _context.Employees.Where(e => e.DepartmentId == departmentId).ToList();
            return result;
        }

        [HttpGet("[action]")]
        public IEnumerable<DepartmentDataModel> GetDepartments()
        {
            var result = new List<DepartmentDataModel>();
            result = _context.Departments.ToList();

            return result;
        }

        [HttpPost]
        [Route("[action]")]
        public IEnumerable<DepartmentDataModel> GetStoreDepartments([FromForm] string storeId)
        {
            var result = new List<DepartmentDataModel>();
            result = _context.Departments.Where(d => d.StoreId == storeId).ToList();
            return result;
        }

        [HttpGet("[action]")]
        public IEnumerable<StoreDataModel> GetStores()
        {
            var result = new List<StoreDataModel>();
            result = _context.Stores.ToList();

            return result;
        }

        [HttpGet("[action]")]
        public IEnumerable<GoodDataModel> GetGoods()
        {
            var result = new List<GoodDataModel>();
            result = _context.Goods.ToList();

            return result;
        }

        [HttpPost]
        [Route("[action]")]
        public IEnumerable<GoodDataModel> GetStoreGoods([FromForm] string storeId)
        {
            var result = new List<GoodDataModel>();
            result = _context.Goods.Where(g => g.StoreId == storeId).ToList();
            return result;
        }

        [HttpPost]
        [Route("[action]")]
        public EmployeeDataModel CreateEmployee([FromForm] EmployeeDataModel employee)
        {
            var model = new EmployeeDataModel();
            model.Id = Guid.NewGuid().ToString();
            model.Name = employee.Name;
            model.IdentityNumber = employee.IdentityNumber;
            model.Salary = employee.Salary;
            model.Title = employee.Title;
            model.DepartmentId = employee.DepartmentId;

            _context.Employees.Add(model);
            _context.SaveChanges();
            return model;
        }

        [HttpPost]
        [Route("[action]")]
        public DepartmentDataModel CreateDepartment([FromForm] DepartmentDataModel department)
        {
            var model = new DepartmentDataModel();

            model.Id = Guid.NewGuid().ToString();
            model.DepartmentNumber = department.DepartmentNumber;
            model.Name = department.Name;
            model.StoreId = department.StoreId;

            _context.Departments.Add(model);
            _context.SaveChanges();
            return model;
        }

        [HttpPost]
        [Route("[action]")]
        public StoreDataModel CreateStore([FromForm] StoreDataModel store)
        {
            var model = new StoreDataModel();

            model.Id = Guid.NewGuid().ToString();
            model.StoreNumber = store.StoreNumber;
            model.Name = store.Name;

            _context.Stores.Add(model);
            _context.SaveChanges();
            return model;
        }

        [HttpPost]
        [Route("[action]")]
        public GoodDataModel CreateGood([FromForm] GoodDataModel good)
        {
            var model = new GoodDataModel();

            model.Id = Guid.NewGuid().ToString();
            model.IdentityNumber = good.IdentityNumber;
            model.Name = good.Name;
            model.Value = good.Value;
            model.StoreId = good.StoreId;

            _context.Goods.Add(model);
            _context.SaveChanges();
            return model;
        }
    }
}
