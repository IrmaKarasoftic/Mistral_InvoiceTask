using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Models;
using TaskDb;
using TaskDb.Entities;

namespace Task_API.Controllers
{
    public class LoginController : ApiController
    {
        public IHttpActionResult Get(UserModel model, string returnUrl)
        {
            if (model.Username != null && model.Password != null)
            {
                bool isOK = Helpers.LoginHelper.checkLoginInfo(model.Username, model.Password);
                if (isOK) return Ok();
            }
            return BadRequest();
        }

        public IHttpActionResult Post(UserModel user)
        {
            try
            {
                using (AppContext context = new AppContext())
                {
                    Repository<User> users = new Repository<User>(context);
                    Repository<AuthenticationToken> tokens = new Repository<AuthenticationToken>(context);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
