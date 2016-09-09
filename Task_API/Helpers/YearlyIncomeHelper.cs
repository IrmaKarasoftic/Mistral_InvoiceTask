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
            Repository<Invoice> companyRepository = new Repository<Invoice>(context);
            double total = 0;

            foreach (var item in companyRepository.context.InvoiceItems)
            {
                if (item.Invoice.Date.Year == year)
                {
                    total += item.Item.UnitPrice * item.Item.Quantity;
                    model.Items.Add(factory.Create(item.Item));
                }
            }
            return model;
        }
    }
}