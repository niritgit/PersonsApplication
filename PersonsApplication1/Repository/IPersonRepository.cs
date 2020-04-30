using PersonsApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonsApplication1.Repository
{
    public interface IPersonRepository
    {
        IEnumerable<Person> GetPersons();

        Person GetPersonByID(string PersonId);


        void InsertPerson(Person person);

        void UpdatePerson(Person person);
        void DeletePerson(string PersonId);

        void Save();
    }
}
