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
                Customer = invoice.Customer.Id,
                CustomerName = invoice.Customer.Name
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

        public CustomerModel Create(Customer Customer)
        {
            return new CustomerModel()
            {
                Id = Customer.Id,
                Name = Customer.Name,
                Company = Customer.Company.Id,
                CompanyName=Customer.Company.Name
            };
        }
        
        public InvoiceItemModel Create(InvoiceItem invoiceItem)
        {
            return new InvoiceItemModel()
            {
                Id = invoiceItem.Id,
                InvoiceId = invoiceItem.Invoice.Id,
                ItemId = invoiceItem.Item.Id,
                Quantity = invoiceItem.Quantity
            };
        }
    }
}