import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginsignupService {
  url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }

  usersignup(data){
    return this.http.post(this.url+'sign_up',data);
  }

  userlogin(data){
    return this.http.post(this.url+'user_login',data);
  }
}
