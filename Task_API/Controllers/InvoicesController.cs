using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Controllers;
using Task_API.Models;
using TaskDb;

namespace Task_API.Controllers
{
    public class InvoicesController : HomeController<Invoice>
    {
        public InvoicesController(Repository<Invoice> repo):base(repo) {}
        public IHttpActionResult Get()
        {
            try
            {
                var invoices = Repository.Get().ToList();
                if (invoices != null)
                {
                    return Ok(invoices);
                }
                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
