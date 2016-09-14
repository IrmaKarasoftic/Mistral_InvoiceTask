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
            CustomerModel bill = Create(invoice.BillTo);
            CustomerModel ship = Create(invoice.ShipTo);

            return new InvoiceModel()
            {
                Id = invoice.Id,
                Date = invoice.Date,
                Items = items,
                Status = invoice.Status.ToString(),
                Customer = invoice.Customer.Id,
                CustomerName = invoice.Customer.Name,
                BillTo = bill,
                ShipTo = ship
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

        public CustomerModel Create(Customer customer)
        {
            return new CustomerModel()
            {
                Id = customer.Id,
                Name = customer.Name,
                Company = customer.Company.Id,
                CompanyName=customer.Company.Name
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