using Microsoft.EntityFrameworkCore;
using PersonsApplication1.DBContexts;
using PersonsApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonsApplication1.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly PersonContext _dbContext;

        public PersonRepository(PersonContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void DeletePerson(string personId)
        {
            var person = _dbContext.Persons.Find(personId);
            _dbContext.Persons.Remove(person);
            Save();
        }

        public Person GetPersonByID(string personId)
        {
            return _dbContext.Persons.Find(personId);
        }

        public IEnumerable<Person> GetPersons()
        {
            return _dbContext.Persons.ToList();
        }

        public void InsertPerson(Person person)
        {
            _dbContext.Add(person);
            Save();
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        public void UpdatePerson(Person person)
        {
            var entry = _dbContext.Persons.First(e => e.Id == person.Id);
            _dbContext.Entry(entry).CurrentValues.SetValues(person);
            //_dbContext.Entry(person).State = EntityState.Modified;
            
            Save();
        }
    }
}
