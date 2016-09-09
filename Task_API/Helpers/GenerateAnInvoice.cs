using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Helpers
{
    public class GenerateAnInvoice
    {

        public static void Create(InvoiceModel model, AppContext context)
        {
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            Invoice invoice = new Invoice();

<<<<<<< HEAD
            invoice.Id = model.Invoice.Id;
            invoice.Date = model.Invoice.Date;
            invoice.Customer = context.Customers.Find(model.Customer);
            invoice.Status = (Status)Enum.Parse(typeof(Status), model.Invoice.Status);
            foreach (var i in model.Invoice.Items)
=======
            invoice.Id = model.Id;
            invoice.Date = model.Date;
            invoice.Costumer = context.Costumers.Find(model.Costumer);
            invoice.Status = (Status)Enum.Parse(typeof(Status), model.Status);
            foreach (var i in model.Items)
>>>>>>> ferhat
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

            invoiceRepository.Insert(invoice);
        }
        public static List<InvoiceModel> GetAllInvoices(AppContext context)
        {
            ModelFactory factory = new ModelFactory();
            return new Repository<Invoice>(context).Get().ToList().Select(x => factory.Create(x)).ToList();

        }
    }
}