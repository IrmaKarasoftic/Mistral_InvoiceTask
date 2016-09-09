using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Helpers
{
    public class ChangeStatusHelper
    {
        public static void ChangeStatus(InvoiceModel model, string status, AppContext context)
        {
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            Invoice invoice = new Invoice();
            invoice.Id = model.Id;
            invoice.Date = model.Date;
            invoice.Customer = context.Customers.Find(model.Customer);
            invoice.Status = (Status)Enum.Parse(typeof(Status), status);

            foreach (var i in model.Items)
            {
                Item item = new Item()
                {
                    Id = i.Id,
                    Description = i.Description,
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice
                };
                invoice.Items.Add(item);
            }

            invoiceRepository.Update(invoice, model.Id);
        }
    }
}