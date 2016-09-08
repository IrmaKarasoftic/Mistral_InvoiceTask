﻿using System;
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

            invoice.Id = model.Id;
            invoice.Date = model.Date;
            invoice.Costumer = context.Costumers.Find(model.Costumer);
            invoice.Status = (Status)Enum.Parse(typeof(Status), model.Status);
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

            invoiceRepository.Insert(invoice);
        }
        
        public static List<InvoiceModel> GetAllInvoices(AppContext context)
        {
            ModelFactory factory = new ModelFactory();
            return new Repository<Invoice>(context).Get().ToList().Select(x => factory.Create(x)).ToList();

        }
    }
}