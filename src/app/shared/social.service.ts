import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Social } from '../social.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http:HttpClient) { }

  createSocial(facebook: string, instagram: string, twitter: string, linkedin:string){
    const postTemplate: Social={facebook: facebook, instagram: instagram, twitter: twitter,linkedin: linkedin};
    this.http.post<{data:String}>('https://emailsignature-1aa20.firebaseio.com/social.json', postTemplate,{
      observe:'response'
    })
    .subscribe(responseData=>{
      console.log(responseData);
    });
  }

  fetchSocial(): Observable<any>{
    return this.http.get<{ [key: string]: Social; }>('https://emailsignature-1aa20.firebaseio.com/social.json')
      .pipe(
        map(responseData => {
          const socialArray: Social[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              socialArray.push({ ...responseData[key], id: key });
            }
          }
          return socialArray;
        })
      );
     //.subscribe(posts=>{});
  }
  deleteSocial(){
    return this.http.delete('https://emailsignature-1aa20.firebaseio.com/social.json');
  }
}
