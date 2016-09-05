using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static TaskDb.Enumerators;

namespace TaskDb
{
    public class Invoice
    {
        public Invoice()
        {
            Items = new Collection<Item>();
        }

        public int InvoiceId { get; set; }
        public DateTime Date { get; set; }
        public virtual ICollection<Item> Items { get; set; }
        public Status Status { get; set; }
        public virtual Costumer Costumer { get; set; }

    }
}
