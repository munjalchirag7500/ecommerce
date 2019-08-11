import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }

  sendFeedback(data){
    return this.http.post(this.url+'savefeedback',data);
  }
}
