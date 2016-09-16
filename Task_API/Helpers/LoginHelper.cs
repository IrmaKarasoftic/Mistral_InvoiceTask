using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace Task_API.Helpers
{
    public class LoginHelper
    {

        public static bool checkLoginInfo(string username, string password)
        {
            IEnumerable<string[]> lines = File.ReadAllLines("..\\TaskDb\\b61f373205ceecdb70d6f206a2494846\\loginPodaci.csv").Select(a => a.Split(','));
            foreach (var line in lines)
            {
                if (line[0] == username && line[1] == MD5Hash(password)) return true;
            }
            return false;
        }

        public static string MD5Hash(string input)
        {
            StringBuilder hash = new StringBuilder();
            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(input));

            for (int i = 0; i < bytes.Length; i++)
            {
                hash.Append(bytes[i].ToString("x2"));
            }
            return hash.ToString();
        }
    }
}