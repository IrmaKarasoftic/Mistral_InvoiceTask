using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskDb;
using static TaskDb.Enumerators;

namespace Task_API.Models
{
    public class EntityParser
    {
        public Invoice Create(InvoiceModel model, AppContext context)
        {
            return new Invoice()
            {
                Id = model.Id,
                Date = model.Date,
                Costumer = context.Costumers.Find(model.Costumer),
                Status = (Status)Enum.Parse(typeof(Status), model.Status)
            };
        }
        public Item Create(ItemModel model, AppContext context)
        {
            return new Item()
            {
                Id = model.Id,
                Description = model.Description,
                Quantity = model.Quantity,
                UnitPrice = model.UnitPrice
            };
        }
        public InvoiceItem Create(InvoiceItemModel model, AppContext context)
        {
            return new InvoiceItem()
            {
                Invoice = context.Invoices.Find(model.InvoiceId),
                Item = context.Items.Find(model.ItemId),
                Quantity = model.Quantity
            };
        }
        public Company Create(CompanyModel model, AppContext context)
        {
            return new Company
            {
                Id = model.Id,
                Name = model.Name,
                city = model.City,
                phoneNumber = model.PhoneNumber,
                StreetAddress = model.StreetAddress,
                zipCode = model.ZipCode
            };
        }
        public Costumer Create(CostumerModel model, AppContext context)
        {
            return new Costumer()
            {
                Id = model.Id,
                Name = model.Name,
                Company = context.Companies.Find(model.Company)
            };
        }
    }
}