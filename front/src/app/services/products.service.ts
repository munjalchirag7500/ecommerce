import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }
  fetchLatestProducts(){
    return this.http.get(this.url+'fetch_latest_products');
  }

  fetchProWithCname(cname){
    return this.http.get(this.url+'fetch_pro_with_cname/'+cname);
  }

  fetchProWithId(id)
  {
    return this.http.get(this.url+'fetch_pro_with_id/'+id);
  }

  //insert item to cart
  addToCart(data){
    return this.http.post(this.url+'add_to_cart',data);
  }


}
