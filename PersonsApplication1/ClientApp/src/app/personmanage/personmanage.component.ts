import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Person } from '../person';

@Component({
  selector: 'app-personmanage',
  templateUrl: './personmanage.component.html',
  styleUrls: ['./personmanage.component.css']
})
export class PersonmanageComponent implements OnInit {
  months: string[] = [];
  isvalidemail: boolean = true;
  @Input()
  idFromParent: string='';
  @Input()
  personname: string;
  @Input()
  personid: string;
  @Input()
  personemail: string;
  @Input()
  persondob: string;
  @Input()
  persongender: number = -1;
  @Input()
  personphone: string;
  @Input()
  submitname: string;
  @Output()
  notify: EventEmitter<Person> = new EventEmitter();

  

  constructor(private srv: UtilsService) { this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];}

  ngOnInit() {
  }

  IsValidEmail(emailInput: string) {
    //check if email is valid
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!expr.test(emailInput)) {
      this.isvalidemail = false;
      
    }
    this.isvalidemail = true;
    return this.isvalidemail;
  }
  addUpdatePerson(id: string, name: string, email: string, dob: string, gender: string, phone: string, dateBirth:string, isvalid) {
    //check if form is valid, mandatory fields- id, date of birth, name
    if (id == null || id == '' || name == '' || name == null || (this.idFromParent == "" && dob == null) || !isvalid) {
      return;
    }
    if (id.trim() == '' || name.trim() == '' || (this.idFromParent == "" && dob.trim() == "")) {
      return;
    }
    //check if email is valid-for new person
    if (this.idFromParent == "" && email != null && email.trim() != "" && this.IsValidEmail(email)==false) {
      return;
    }
    //check if email is valid-for update person
    if (this.idFromParent != "" && this.personemail != null && this.personemail.trim() != "" && this.IsValidEmail(this.personemail) == false) {
      return;
    }
    var genderNum = parseInt(gender);

    if (this.idFromParent != "")//doUpdate
    {

      var editPerson: Person = new Person();
      editPerson.id = id;
      editPerson.name = name;
      editPerson.dateBirth = this.persondob;
      if (dateBirth !=null)
        editPerson.dateBirth = dateBirth;
      editPerson.gender = genderNum;
      editPerson.email = this.personemail;
      editPerson.phone = phone;

      var date = new Date(editPerson.dateBirth);
      var month = date.getMonth()
      editPerson.dateBirthDisplay = date.getDate() + "-" + this.months[month] + "-" + date.getFullYear();

      this.srv.updatePerson(name, editPerson.email, editPerson.dateBirth, genderNum, phone, id).subscribe(
        response => {
          this.notify.emit(editPerson);//notify parent that a person is modified.

        },
        err => { console.log(err); })

    }
    else {//doInsert
      var newPerson: Person = new Person();
      newPerson.id = id;
      newPerson.name = name;
      newPerson.dateBirth = dob;
      newPerson.gender = genderNum;
      newPerson.email = email;
      newPerson.phone = phone;

      var date = new Date(newPerson.dateBirth);
      var month = date.getMonth()
      newPerson.dateBirthDisplay = date.getDate() + "-" + this.months[month] + "-" + date.getFullYear();

      this.srv.addPerson(id, name, email, dob, genderNum, phone).subscribe(
        response => {
          this.notify.emit(newPerson);//notify parent that there is new person.

        },
        err => { console.log(err); })
    }

  }

}
