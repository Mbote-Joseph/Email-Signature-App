import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Users } from '../Users.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly REST_API_SERVER = "http://localhost:8080/v1";
  private readonly HEROKU_API_SERVER = "http://emailsignaturegen.herokuapp.com/v1";


  constructor( private http: HttpClient) { }

  


  createUser(name: string, company: string, position: string, department: string, phone:string, mobile: string, website: string, skype: string, email: string, address: string) {
    const postUser : Users = {name:name, company:company, position:position, department:department, phone:phone, mobile:mobile, website:website, skype:skype, email:email, address:address};
    this.http.post<{data:string }>(`${this.HEROKU_API_SERVER}/users`, postUser,  {
      observe: 'response'
    })
    .subscribe(responseData =>{
      console.log(responseData);
    });
  }
  
  fetchUser(): Observable<any>{
    return this.http.get<{ [key: string]: Users; }>(`${this.HEROKU_API_SERVER}/users`)
      .pipe(
        map(responseData => {
          const userArray: Users[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              userArray.push({ ...responseData[key], id: key });
            }
          }
          return userArray;
        })
      );
     //.subscribe(posts=>{});
  }
  deleteUser(){
    return this.http.delete(`${this.HEROKU_API_SERVER}/users`);
  }
}

//`${this.HEROKU_API_SERVER}/users`