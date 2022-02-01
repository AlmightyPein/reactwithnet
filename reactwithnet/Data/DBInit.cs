using Microsoft.AspNetCore.Mvc;
using reactwithnet.Models;
using System;
using System.Linq;
namespace reactwithnet.Data
{
    public static class DBInit
    {
        public static void Initialize(UserContext context)
        {

            context.Database.EnsureCreated();
            if (context.Users.Any())
            {
                Console.WriteLine("DB Created");
                return;   // DB has been seeded
            }
            var Users = new UserModel[]
            {

                new UserModel{Username="NARU", Email="sadhad@gmail.com", Password="asdfasdf"}
            };
            foreach (UserModel u in Users)
            {
                context.Users.Add(u);
                context.SaveChanges();
                Console.WriteLine(context.Users.LongCount());
            }



        }
    }
}
