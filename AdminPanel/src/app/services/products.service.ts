import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
url="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }
  fetchCatNames()
  {
  	return this.http.get(this.url+'fetchcatnames');
  }

  addProductData(data)
  {
  	console.log("in service");
  	return this.http.post(this.url+'addproductdata',data);

  }

  fetchProductData(){
  	return this.http.get(this.url+'fetchproductdata');
  }

  deleteProduct(id){
    return this.http.get(this.url+'delproduct/'+id)
  }

  fetchproById(id){     //to patch the edit form
    console.log("in service id:"+id);
    return this.http.get(this.url+'fetchprobyid/'+id); 
  }

  saveEditProductNoImg(data){
    return this.http.post(this.url+'save_edit_product_no_img',data);
  }

   saveEditProductWithImg(data){
    return this.http.post(this.url+'save_edit_product_with_img',data);
  }

}
