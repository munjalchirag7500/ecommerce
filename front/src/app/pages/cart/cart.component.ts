import { Component, OnInit } from '@angular/core';
import {CartService} from 'src/app/services/cart.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
resData;
cartData;
totalProductsInCart;
 public totalCost :Number ;
 bg;
  constructor(private cser:CartService, private router:Router) { }

  ngOnInit() {

// fetching cart items on init
let x=localStorage.getItem('email')
    // let data=({'email':x})
      console.log(x)
      // console.log(data)
    this.cser.fetchCartItems(x)
    .subscribe(res=>{
      console.log("res is below")
      console.log(res);
      this.resData=res;
      this.cartData=this.resData.cdata;
      console.log("no of products"+this.cartData.length);
      this.totalProductsInCart=this.cartData.length;
      if(this.totalProductsInCart==0)
      {
        this.totalCost=0;


          this.bg={
            'emptycart' : true
          }
        // this.isBg=false;
      }
      else{
        this.totalCost=this.resData.total;

         this.bg={
            'emptycart' : false
          }
      }

      localStorage.setItem('cartItems',this.totalProductsInCart);
    })
    
    console.log("total Products ="+this.totalProductsInCart);
  }

  removeFromCart(id){
  let remove={'id':id}
    this.cser.deleteFromCart(remove)
    .subscribe(res=>{
      console.log(res);
      localStorage.setItem('tempRoute',"true")
      this.router.navigate(['/feedback']);
      

    })
    console.log(id);
  }

// placing order 
orderRes;


  order(){
    console.log(" placing order")

   let  now = new Date();
   let month =now.getMonth()+1
    let orderId=now.getHours()+""+now.getMinutes()+""+now.getSeconds()+""+now.getFullYear()+""+month+""+now.getDate()
    console.log(orderId)
    console.log(now)

      
        let orderData ={
          'odata':this.cartData,
           'buyer': localStorage.getItem('username'),
           'orderid':orderId,
           'email':localStorage.getItem('email')
        }



        if(this.cartData.length==0)
        {
          console.log("add products first")
                    Swal.fire({
                                type: 'error',
                                title: "Can't procceed ",
                                text: 'Add some items to cart ',
                              })
        }
        else{
        console.log("placing order cart have items");

        this.cser.saveOrder(orderData)
           .subscribe(res=>{
            console.log(res)
            this.orderRes=res;
            if(this.orderRes.err==0)
            {
                 Swal.fire({
                                type: 'success',
                                title: "Order Placed Suucessfully",
                                text: 'Your order details are sent to  '+localStorage.getItem('email'),
                                footer:'<a href="http://www.gmail.com">Go to Gmail</a>'  
                            })
              

                 //deleting items from the cart after placing order
                 let userEmail=localStorage.getItem('email');
                 console.log(userEmail)
                  this.cser.emptyCart(userEmail)
                  .subscribe(res=>
                  {
                    console.log("res");
                  })

                    // let nav='/trackorder/'+this.orderRes.track_order.orderId;
                 // console.log(nav)
                 this.router.navigate(['/trackorder']);

            }
           })

            }
  }
 

}

// <app-header []> </app-header>