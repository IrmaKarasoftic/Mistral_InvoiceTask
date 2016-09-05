using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskDb
{
    public class Costumer
    {
        public int costumerId { get; set; }
        public string name { get; set; }

        public virtual int companyId { get; set; }
    }
}
