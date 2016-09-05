using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task_API.Models
{
    public class InvoiceModel
    {
        public int InvoiceId { get; set; }
        public DateTime Date { get; set; }
        public List<ItemModel> Items { get; set; }
        public string Status { get; set; }
        public virtual String CostumerName { get; set; }
    }
}