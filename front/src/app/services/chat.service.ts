import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
	url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }

  saveUserChat(data){
  	return this.http.post(this.url+'save_user_chat',data);
  }

  fetchUserMsg(email){
  	return this.http.get(this.url+'fetch_user_msg/'+email);
  }

}
