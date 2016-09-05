using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskDb
{
    public class InvoiceItem
    {
        public int quantity { get; set; }
        public virtual Invoice Invoice { get; set; }
        public virtual Item Item { get; set; }
    }
}
