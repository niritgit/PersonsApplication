using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PersonsApplication1.Models
{
    public class Person
    {
        [MaxLength(50)]
        public string Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public string Email { get; set; }
        public DateTime DateBirth { get; set; }

        public byte? Gender { get; set; }
        [MaxLength(20)]
        public string Phone { get; set; }
    }
}
