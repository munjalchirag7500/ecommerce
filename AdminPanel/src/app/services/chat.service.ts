import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
	url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }

  fetchChatReq(){
  	return this.http.get(this.url+"fetch_chat_Req");
  }

    saveAdminChat(data){
  	return this.http.post(this.url+'save_admin_chat',data);  
  }

    fetchAdminMsg(email){
  	return this.http.get(this.url+'fetch_user_msg/'+email);
  }

}
