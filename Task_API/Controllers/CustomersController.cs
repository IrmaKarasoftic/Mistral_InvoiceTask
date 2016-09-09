using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Models;
using TaskDb;

namespace Task_API.Controllers
{
    public class CustomersController : HomeController<Customer>
    {
        public CustomersController(Repository<Customer> repo):base(repo) {}

        public IHttpActionResult Get()
        {
            try
            {
                var Customers = Repository.Get().ToList().Select(x => Factory.Create(x)).ToList();
                if (Customers != null) return Ok(Customers);
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Get(int id)
        {
            try
            {
                var Customer = Repository.Get(id);
                if (Customer != null) return Ok(Customer);
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Post(CustomerModel Customer)
        {
            if (Customer != null)
            {
                try
                {
                    Repository.Insert(Parser.Create(Customer, Repository.HomeContext()));
                    return Ok();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }

        public IHttpActionResult Put(CustomerModel Customer, int id)
        {
            if(Customer != null)
            {
                try
                {
                    Customer co = Repository.Get(id);
                    Customer cost = Parser.Create(Customer, Repository.HomeContext());
                    if (co != null) 
                    {
                        Repository.Update(cost, id);
                        return Ok(Factory.Create(cost));
                    }
                    return NotFound();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }
        
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Customer Customer = Repository.Get(id);
                if (Customer != null)
                {
                    Repository.Delete(id);
                    return Ok();
                }
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
