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
            List<InvoiceItemModel> items = new List<InvoiceItemModel>();
            foreach (var i in invoice.Items)
            {
                var itModel = new InvoiceItemModel();
                itModel.Id = i.Id;
                itModel.Description = i.Item.Description;
                itModel.Quantity = i.Quantity;
                itModel.Price = i.Item.UnitPrice;
                items.Add(itModel);
            }

            CustomerModel bill = new CustomerModel()
            {
                Id = invoice.BillTo.Id,
                Name = invoice.BillTo.Name,
                Company = invoice.BillTo.Company.Id,
                CompanyName = invoice.BillTo.Name,
                StreetAddress=invoice.Customer.Company.StreetAddress,
                PhoneNumber = invoice.Customer.Company.phoneNumber,
                City = invoice.Customer.Company.city,
                ZipCode = invoice.Customer.Company.zipCode
            };
            CustomerModel ship = new CustomerModel()
            {
                Id = invoice.BillTo.Id,
                Name = invoice.BillTo.Name,
                Company = invoice.BillTo.Company.Id,
                CompanyName = invoice.BillTo.Name,
                StreetAddress = invoice.Customer.Company.StreetAddress,
                PhoneNumber = invoice.Customer.Company.phoneNumber,
                City = invoice.Customer.Company.city,
                ZipCode = invoice.Customer.Company.zipCode
            };
            return new InvoiceModel()
            {
                Id = invoice.Id,
                Date = invoice.Date,
                Items = items,
                Status = invoice.Status.ToString(),
                Customer = invoice.Customer.Id,
                CustomerName = invoice.Customer.Name,
                BillTo = bill,
                ShipTo = ship,
                IsDeleted = invoice.IsDeleted,
            };
        }

        public ItemModel Create(Item item)
        {
            return new ItemModel()
            {
                Id = item.Id,
                Description = item.Description,
                Quantity = item.Quantity,
                UnitPrice = item.UnitPrice,
                IsDeleted = item.IsDeleted,
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
                CompanyName = customer.Company.Name,
                City = customer.Company.city,
                ZipCode = customer.Company.zipCode,
                PhoneNumber = customer.Company.phoneNumber,
                StreetAddress = customer.Company.StreetAddress,
                IsDeleted = customer.IsDeleted,
            };
        }
        
        public InvoiceItemModel Create(InvoiceItem invoiceItem)
        {
            return new InvoiceItemModel()
            {
                Id = invoiceItem.Id,
                InvoiceId = invoiceItem.Invoice.Id,
                ItemId = invoiceItem.Item.Id,
                Quantity = invoiceItem.Quantity,
                Description = invoiceItem.Item.Description,
                Price = invoiceItem.Price
            };
        }
    }
}