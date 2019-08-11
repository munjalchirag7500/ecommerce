import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
 url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }

  fetchSearchData(data){
  	return this.http.get(this.url+'get_search_data/'+data);
  }
}
