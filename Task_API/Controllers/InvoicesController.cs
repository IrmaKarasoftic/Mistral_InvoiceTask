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
                List<InvoiceModel> invoices = Helpers.GenerateAnInvoice.GetAllInvoices(Repository.HomeContext());
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

        public IHttpActionResult Get(int id)
        {
            try
            {
                var invoice = Repository.Get(id);
                if (invoice != null) return Ok(invoice);
                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Post(InvoiceModel invoice)
        {
            if(invoice != null)
            {
                try
                {
                    Helpers.GenerateAnInvoice.Create(invoice, Repository.HomeContext());
                    return Ok();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        public IHttpActionResult Put(InvoiceModel invoice, int id)
        {
            try
            {
                Invoice invojs = Repository.Get(id);
                Invoice inv = Parser.Create(invoice, Repository.HomeContext());
                if (invojs != null)
                {
                    Repository.Update(inv, id);
                    return Ok(Factory.Create(inv));
                }
                else return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                Invoice invoice = Repository.Get(id);
                if (invoice != null)
                {
                    Repository.Delete(id);
                    return Ok();
                }
                else return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
