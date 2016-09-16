using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Models;

namespace Task_API.Controllers
{
    public class LoginController : ApiController
    {
        public IHttpActionResult Login(UserModel model, string returnUrl)
        {
            if(model.Username != null && model.Password != null)
            {
                bool isOK = Helpers.LoginHelper.checkLoginInfo(model.Username, model.Password);
                if (isOK) return Ok();
            }
            return BadRequest();
        }
    }
}
