using Microsoft.EntityFrameworkCore;
using PersonsApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonsApplication1.DBContexts
{
    public class PersonContext : DbContext
    {
        public PersonContext(DbContextOptions<PersonContext> options) : base(options)
        {
        }
        public DbSet<Person> Persons { get; set; }


        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{

        //}

    }
}
