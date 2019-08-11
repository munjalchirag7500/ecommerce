import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
	url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }
  
  checkProfile(email){
  	return this.http.post(this.url+'check_profile',email);
  }

  updateProfile(data){
  	return this.http.post(this.url+'update_profile',data);
  }

}
