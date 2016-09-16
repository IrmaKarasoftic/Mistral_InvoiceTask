using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using WebApi.Models;
using Database;

namespace WebApi.Services
{
    public class UserModel
    {
        public User currentUser
        {
            get
            {
                if (!Thread.CurrentPrincipal.Identity.IsAuthenticated) return null;
                string username = Thread.CurrentPrincipal.Identity.Name;
                if (username == null) username = HttpContext.Current.User.Identity.Name;
                var user = (new Repository<User>(new SchoolContext())).Get().Where(x => x.FirstName == username).FirstOrDefault();
                if (user == null) user = (new Repository<User>(new SchoolContext())).Get().Where(x => x.FirstName + x.LastName.Substring(0,1) == username).FirstOrDefault();
                return user;
            }
        }
    }
}