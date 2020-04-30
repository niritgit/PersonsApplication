import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private personsUrl: string = "/api/person";
  genderOption: any = { MALE: 1, FEMALE: 2, OTHER: 3 };

  constructor(private http: HttpClient) { }

  getPersons(): Observable<any> {
    return this.http.get(this.personsUrl);
  }

  addPerson(id: string, name: string, email: string, dob: string, gender: number, phone: string) {
    //add person
    var personNew;

    if (gender == this.genderOption.MALE || gender == this.genderOption.FEMALE || gender == this.genderOption.OTHER) {
      personNew = {
        Id: String(id),
        Name: name,
        Email: email,
        Phone: phone,
        DateBirth: new Date(),
        gender: gender
      }
    }
    else {
      personNew = {
        Id: String(id),
        Name: name,
        Email: email,
        Phone: phone,
        DateBirth: new Date()
      }
    }
    

    personNew.DateBirth = new Date(dob);

    return this.http.post(this.personsUrl, personNew);
  }

  updatePerson(name: string, email: string, dob: string, gender: number, phone: string, id: string) {
    //update a person
    var personUpdate;

    if (gender == this.genderOption.MALE || gender == this.genderOption.FEMALE || gender == this.genderOption.OTHER) {
      personUpdate = {
        Id: String(id),
        Name: name,
        Email: email,
        Phone: phone,
        DateBirth: new Date(),
        gender: gender
      }
    }
    else {
      personUpdate = {
        Id: String(id),
        Name: name,
        Email: email,
        Phone: phone,
        DateBirth: new Date()
      }
    }


    personUpdate.DateBirth = new Date(dob);
    //return this.http.post(this.personsUrl + "/" + id, personUpdate);
    //workaround - due to technical infra issues with iis express that prevent using PUT,
    //use POST.
    return this.http.post(this.personsUrl, personUpdate);
  }

  deletePerson(id: string) {
    //delete a person
    return this.http.delete(this.personsUrl + "/"+id);
  }
}
