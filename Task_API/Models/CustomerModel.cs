using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class CustomerModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Company { get; set; }
        public string CompanyName { get; set; }
    }
}