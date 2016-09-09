using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class ShippingDetailsModel
    {
        String CostumerName { get; set; }
        String CompanyName { get; set; }
        String StreetAddress { get; set; }
        int ZipCode { get; set; }
        String PhoneNumber { get; set; }
    }
}