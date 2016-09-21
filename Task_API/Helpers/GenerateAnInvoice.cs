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
            EntityParser parser = new EntityParser();
            ModelFactory factory = new ModelFactory();
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            Repository<Item> itemRepository = new Repository<Item>(context);

            Invoice invoice = new Invoice();
            invoice.Id = model.Id;
            invoice.Date = model.Date;
            invoice.Customer = context.Customers.Find(model.Customer);
            invoice.Status = (Status)Enum.Parse(typeof(Status), model.Status);
            foreach (var i in model.Items)
            {
                InvoiceItem item = new InvoiceItem()
                {
                    Id = i.Id,
                    Invoice = parser.Create(factory.Create(invoiceRepository.Get(i.InvoiceId)), context),
                    Item= parser.Create(factory.Create(itemRepository.Get(i.ItemId)), context),
                    Quantity = i.Quantity
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

        public static void UpdateInvoice(InvoiceModel model, AppContext context)
        {
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            Invoice invoice = new Invoice();
            EntityParser parser = new EntityParser();
            invoice = parser.Create(model, context);
            invoiceRepository.Update(invoice, model.Id);
        }

        public static void DeleteInvoice(InvoiceModel model, AppContext context)
        {
            Repository<Invoice> invoiceRepository = new Repository<Invoice>(context);
            Invoice invoice = invoiceRepository.Get(model.Id);
            invoiceRepository.Delete(model.Id);
        }
    }
}