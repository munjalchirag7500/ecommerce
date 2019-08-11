import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url ="http://localhost:7788/api/";
  constructor(private http:HttpClient) { }

  // fetch items to cart
fetchCartItems(email){
	console.log("data in service");
	console.log(email)
  return this.http.get(this.url+'fetch_cart_items/'+email);
}

//delete cart items
deleteFromCart(id){
  return this.http.post(this.url+'del_from_cart',id);
}


// placing order 

saveOrder(data){
	return this.http.post(this.url+'save_order',data);
}

// deleting items from cart after placing order

emptyCart(email){
	return this.http.get(this.url+'empty_cart/'+email);
}

}
