using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskDb
{
    public class Repository<E> where E:class
    {
        public Context context;
        public DbSet<E> dbSet;

        public Repository(Context _context)
        {
            context = _context;
            dbSet = _context.Set<E>();
        }

        public Context HomeContext()
        {
            return context;
        }
    }
}
