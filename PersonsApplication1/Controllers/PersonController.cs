using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PersonsApplication1.Models;
using PersonsApplication1.Repository;

namespace PersonsApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IPersonRepository _personRepository;
        enum Gender { MALE = 1, FEMALE,OTHER}

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var persons = _personRepository.GetPersons();
            return new OkObjectResult(persons);
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var person = _personRepository.GetPersonByID(id.ToString());
            return new OkObjectResult(person);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Person person)
        {
            if (person == null)
            {
                return BadRequest();
            }
            if (CheckValidPerson(person)==false)
            {
                return BadRequest();
            }
            //workaround - due to technical infra issues with iis express that prevent using PUT
            //this method is also used to update person record,
            //by checking the existence of the id record, if it exists do update else insert.
            var personEnt = _personRepository.GetPersonByID(person.Id);

            using (var scope = new TransactionScope())
            {

                if (personEnt ==null)
                {
                    _personRepository.InsertPerson(person);
                    scope.Complete();
                    return CreatedAtAction(nameof(Get), new { id = person.Id }, person);
                }
                else
                {
                    _personRepository.UpdatePerson(person);
                    scope.Complete();
                    return new OkResult();
                }

            }

        }

       

        [HttpPut]
        [AcceptVerbs("PUT")]
        public IActionResult Put([FromBody] Person person)
        {
            if (person != null)
            {
                if (CheckValidPerson(person) == false)
                {
                    return BadRequest();
                }
                using (var scope = new TransactionScope())
                {
                    _personRepository.UpdatePerson(person);
                    scope.Complete();
                    return new OkResult();
                }
            }
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _personRepository.DeletePerson(id);
            return new OkResult();
        }

        private Boolean CheckValidPerson(Person person)
        {
            if (String.IsNullOrEmpty(person.Id) || String.IsNullOrEmpty(person.Name) || person.DateBirth == default(DateTime) )//mandatory fields
            {
                return false;
            }
            if(person.Gender != null && person.Gender !=(int)Gender.FEMALE && person.Gender != (int)Gender.MALE && person.Gender != (int)Gender.OTHER)//gender values
            { 
                return false;
            }
            if(String.IsNullOrEmpty(person.Email) == false && new EmailAddressAttribute().IsValid(person.Email)==false)//check email valid
            {
                return false;
            }
            if(String.IsNullOrEmpty(person.Phone)==false &&  person.Phone.All(char.IsDigit)==false)//if has phone - check contains only digits
            {
                return false;
            }
            if ( person.Id.All(char.IsDigit) == false)//if has id - check contains only digits
            {
                return false;
            }
            return true;

        }

        
    }
}
