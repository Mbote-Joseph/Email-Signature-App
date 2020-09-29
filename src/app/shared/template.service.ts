import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Templates } from '../templates.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http:HttpClient) { }

  createTemplate(template:string){
    const postTemplate: Templates={template:template};
    this.http.post<{data:String}>('https://emailsignature-1aa20.firebaseio.com/templates.json', postTemplate,{
      observe:'response'
    })
    .subscribe(responseData=>{
      console.log(responseData);
    });
  }

  fetchTemplate(): Observable<any>{
    return this.http.get<{ [key: string]: Templates; }>('https://emailsignature-1aa20.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          const templateArray: Templates[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              templateArray.push({ ...responseData[key], id: key });
            }
          }
          return templateArray;
        })
      );
     //.subscribe(posts=>{});
  }
  deleteTemplate(){
    return this.http.delete('https://emailsignature-1aa20.firebaseio.com/templates.json');
  }
}
