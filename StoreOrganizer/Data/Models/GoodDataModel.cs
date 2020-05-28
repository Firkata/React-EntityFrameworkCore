using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoreOrganizer.Data.Models
{
    public class GoodDataModel
    {
        public string Id { get; set; }
        public string IdentityNumber { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public string StoreId { get; set; }

    }
}
