import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService 
{
	url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }
  addCat(data)
  {
  	return this.http.post(this.url+'addCategory',data);
  }

  getCat()
  {
  	return this.http.get(this.url+'getCategory');
  }

  deletecategory(id){
    return this.http.get(this.url+'delcat/'+id)
  }

  fetchcatById(id){
    return this.http.get(this.url+'fetchcatbyid/'+id);
  }
saveEditCat(data){
  return this.http.post(this.url+'saveeditcat',data);
}


}
