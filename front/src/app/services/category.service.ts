import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }

  fetchCatData(){
   return this.http.get(this.url+'getCategory');
  }
}
