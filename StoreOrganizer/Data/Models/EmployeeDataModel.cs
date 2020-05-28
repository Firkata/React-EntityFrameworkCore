using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreOrganizer.Data.Models
{
    public class EmployeeDataModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string IdentityNumber { get; set; }
        public double Salary { get; set; }
        public string Title { get; set; }
        public string DepartmentId { get; set; }
    }
}
