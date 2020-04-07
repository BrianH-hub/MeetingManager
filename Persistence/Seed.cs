using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName ="Ibrahim",
                        UserName ="ibrahim",
                        Email = "ibrahim@test.com"
                    },
                    new AppUser
                    {
                        DisplayName ="Ming",
                        UserName ="ming",
                        Email = "ming@test.com"
                    },
                    new AppUser
                    {
                        DisplayName ="Neil",
                        UserName ="neil",
                        Email = "neil@test.com"
                    },
                    new AppUser
                    {
                        DisplayName ="Brain",
                        UserName ="brain",
                        Email = "brain@test.com"
                    },
                };

                foreach(var user in users)
                 {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                 }
            }

            if (!context.Meetings.Any())
            {
                var Meetings = new List<Meeting>
                {
                    new Meeting
                    {
                        Title = "Past Meeting 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Meeting 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub",
                    },
                    new Meeting
                    {
                        Title = "Past Meeting 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Meeting 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "Louvre",
                    },
                    new Meeting
                    {
                        Title = "Future Meeting 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Meeting 1 month in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum",
                    },
                    new Meeting
                    {
                        Title = "Future Meeting 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Meeting 2 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "O2 Arena",
                    },
                    new Meeting
                    {
                        Title = "Future Meeting 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Meeting 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Another pub",
                    },
                    new Meeting
                    {
                        Title = "Future Meeting 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Meeting 4 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Yet another pub",
                    },
                    new Meeting
                    {
                        Title = "Future Meeting 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Meeting 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Just another pub",
                    },
                    new Meeting
                    {
                        Title = "Future Meeting 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Meeting 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "Roundhouse Camden",
                    },
                    new Meeting
                    {
                        Title = "Future Meeting 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Meeting 2 months ago",
                        Category = "travel",
                        City = "London",
                        Venue = "Somewhere on the Thames",
                    },
                    new Meeting
                    {
                        Title = "Future Meeting 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Meeting 8 months in future",
                        Category = "film",
                        City = "London",
                        Venue = "Cinema",
                    }
                };

                context.Meetings.AddRange(Meetings);
                context.SaveChanges();
            }
        }
    }
}