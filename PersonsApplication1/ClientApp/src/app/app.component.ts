import { Component, OnInit } from '@angular/core';
import { UtilsService } from './utils.service';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  persons: Person[] = [];
  personToBeUpdate: Person = new Person();
  months: string[] = [];
  genderOption: any = { MALE: 1, FEMALE: 2, OTHER: 3 };

  constructor(private srv: UtilsService) {
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.personToBeUpdate.gender = -1;
  }

  ngOnInit(): void {
    //load all persons
    this.srv.getPersons().subscribe(
      response => {
        this.persons = response as Person[];
        
        var data = this.persons;
        for (var i = 0; i < data.length; i++) {
          var date = new Date(data[i].dateBirth);
          var month = date.getMonth() ;
          data[i].dateBirthDisplay = date.getDate() + "-" + this.months[month] + "-" + date.getFullYear();
        }
      },
      err => { console.log(err); })
  }

  setPersonToBeUpdate(id: string) {
    //when the user clicks to edit a person, this method is called.
    //It sets a person entity that should be modified.
    //In the child container  this data will be changed later.
    var ind = this.isExist(id);
    if (ind < 0)
      return;
    this.personToBeUpdate = this.persons[ind];
    if (this.personToBeUpdate.gender == null)
      this.personToBeUpdate.gender = -1;

  }


  deletePerson(id: string) {
    //delete person
    var ind = this.isExist(id);
    if (ind >= 0) {
      this.srv.deletePerson(id.toString()).subscribe(
        response => { this.persons.splice(ind, 1); },
        err => { console.log(err); });
    }
  }

  isExist(personid: string) {
    var data = this.persons;
    for (var i = 0; i < data.length; i++) {
      if (personid == data[i].id) {

        return i;
      }

    }
    return -1;//not exist
  }

  getNewPerson(data) {
    //this method is called when new person is added (by child container).
    this.persons.push(data);
  }

  getUpdatePerson(data) {
    //this method is called when a person is updated (by child container).
    var ind = this.isExist(data.id);
    if (ind >= 0) {
      this.persons[ind] = data;
    }
    
  }
}
