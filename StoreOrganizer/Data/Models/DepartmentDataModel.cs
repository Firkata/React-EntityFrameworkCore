using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreOrganizer.Data.Models
{
    public class DepartmentDataModel
    {
        public string Id { get; set; }
        public string DepartmentNumber { get; set; }
        public string Name { get; set; }
        public string StoreId { get; set; }
    }
}
