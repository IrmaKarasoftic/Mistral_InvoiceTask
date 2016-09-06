using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskDb;

namespace Task_API.Models
{
    public class ModelFactory
    {
        public InvoiceModel Create(Invoice invoice)
        {
            List<ItemModel> items = new List<ItemModel>();
            foreach (var i in invoice.Items)
            {
                var itModel = new ItemModel();
                itModel.Id = i.Id;
                itModel.Description = i.Description;
                itModel.Quantity = i.Quantity;
                itModel.UnitPrice = i.UnitPrice;
                items.Add(itModel);
            }
            return new InvoiceModel()
            {
                Id = invoice.Id,
                Date = invoice.Date,
                Items = items,
                Status = invoice.Status.ToString(),
                Costumer = invoice.Costumer.Id,
                CostumerName = invoice.Costumer.Name
            };
        }

        public ItemModel Create(Item item)
        {
            return new ItemModel()
            {
                Id = item.Id,
                Description = item.Description,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice
            };
        }

        public CompanyModel Create(Company company)
        {
            return new CompanyModel()
            {
                Id = company.Id,
                StreetAddress = company.StreetAddress,
                City = company.city,
                Name = company.Name,
                PhoneNumber = company.phoneNumber,
                ZipCode = company.zipCode
            };
        }

        public CostumerModel Create(Costumer costumer)
        {
            return new CostumerModel()
            {
                Id = costumer.Id,
                Name = costumer.Name,
                Company = costumer.Company.Id,
                CompanyName=costumer.Company.Name
            };
        }
        
        public InvoiceItemModel Create(InvoiceItem invoiceItem)
        {
            return new InvoiceItemModel()
            {
                InvoiceId = invoiceItem.Invoice.Id,
                ItemId = invoiceItem.Item.Id,
                Quantity = invoiceItem.Quantity
            };
        }
    }
}