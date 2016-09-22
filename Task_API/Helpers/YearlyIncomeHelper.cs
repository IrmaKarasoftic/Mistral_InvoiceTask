using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;

namespace Task_API.Helpers
{
    public class YearlyIncomeHelper
    {
        public static YearlyIncomeModel GetRevenueByYear(int year, AppContext context)
        {
            ModelFactory factory = new ModelFactory();
            YearlyIncomeModel model = new YearlyIncomeModel();
            Repository<InvoiceItem> invoiceRepository = new Repository<InvoiceItem>(context);
            double total = 0;
            var list = invoiceRepository.context.InvoiceItems.ToList();
            foreach (var item in list)
            {
                if (item.Invoice.Date.Year == year)
                {
                    total += item.Item.UnitPrice * item.Item.Quantity;
                    ItemModel iModel = factory.Create(item.Item);
                    model.Items.Add(iModel);
                }
            }
            return model;
        }
    }
}