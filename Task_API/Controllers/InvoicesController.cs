﻿using System;
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
        public InvoicesController(Repository<Invoice> repo) : base(repo) { }
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
            catch (Exception ex)
            {
                return BadRequest(ex.Message.ToString());
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

        public IHttpActionResult Post(InvoiceViewModel invoice)
        {
            if (invoice != null)
            {
                try
                {
                    Helpers.GenerateAnInvoice.Create(invoice, Repository.HomeContext());
                    return Ok(invoice);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        public IHttpActionResult Put(InvoiceModel invoice)
        {
            try
            {
                Helpers.GenerateAnInvoice.UpdateInvoice(invoice, Repository.HomeContext());
                return Ok();
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
                InvoiceModel model = Factory.Create(Repository.Get(id));
                Helpers.GenerateAnInvoice.DeleteInvoice(model, Repository.HomeContext());
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
