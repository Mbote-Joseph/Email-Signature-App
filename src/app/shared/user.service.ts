import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Users } from '../Users.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor( private http: HttpClient) { }



  createUser(name: string, company: string, position: string, department: string, phone:string, mobile: string, website: string, skype: string, email: string, address: string) {
    const postUser : Users = {name:name, company:company, position:position, department:department, phone:phone, mobile:mobile, website:website, skype:skype, email:email, address};
    this.http.post<{data:string }>('https://emailsignature-1aa20.firebaseio.com/posts.json', postUser,  {
      observe: 'response'
    })
    .subscribe(responseData =>{
      console.log(responseData);
    });
  }
  
  fetchUser(): Observable<any>{
    return this.http.get<{ [key: string]: Users; }>('https://emailsignature-1aa20.firebaseio.com/posts.json')
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
    return this.http.delete('https://emailsignature-1aa20.firebaseio.com/posts.json');
  }
}
