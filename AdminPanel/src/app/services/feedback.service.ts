import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
 url="http://localhost:7788/api/"
  constructor(private http:HttpClient) { };
  
  getFeedback(){
  	return this.http.get(this.url+'get_feedback');
  }

}
