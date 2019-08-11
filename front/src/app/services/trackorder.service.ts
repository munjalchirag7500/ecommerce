import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackorderService {
 url="http://localhost:7788/api/";

  constructor(private http:HttpClient) { }

getOrderData(email){
	return this.http.get(this.url+"get_order_data/"+email)
}

getAdd(email){
	return this.http.get(this.url+"get_add/"+email)
}


}
