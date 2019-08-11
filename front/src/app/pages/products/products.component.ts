import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
pro_id;
resData;
cartItem; // used to store data to be sent in cart
  constructor(private ar:ActivatedRoute,private pser:ProductsService,private router:Router) { }

  ngOnInit() {
    
     //// fetching the DETAILS OF A SINGLE products
     this.ar.params.subscribe(par=>{
  		this.pro_id=par.id;
  		// this.c_id=par.cid;
  		this.pser.fetchProWithId(this.pro_id)
  		.subscribe(res=>{
        this.resData=res;
        this.cartItem=res;
        this.cartItem=this.cartItem.cdata[0];
        console.log("fetched");
        console.log(res);
        this.resData=this.resData.cdata;
  		})

    })
    ////
  }

  addToCart(pro)
  { 
   let loginSt=localStorage.getItem('loginStat')
   console.log("loginStat in product"+loginSt);
   if(loginSt == "false")
   {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'you need to login first !!',
      footer: '<a href>Why do I have this issue?</a>'
    })
      
     this.router.navigate(["/login"]);
   }
   else
   {
    console.log('added to cart');
    console.log(this.cartItem.pname);
   let addcartItem=
    {
        'buyer':localStorage.getItem('email'),
        'pname':this.cartItem.pname,
        'description':this.cartItem.description,
        'image':this.cartItem.image,
        'productCategory':this.cartItem.productCategory,
        'price':this.cartItem.price,
        'brand':this.cartItem.brand
    }
    console.log("below is the cart Item")
    console.log(addcartItem);
    this.pser.addToCart(addcartItem)
    .subscribe(res=>{
      console.log(res);
       Swal.fire({
      type: 'success',
      title: 'Yeah',
      text: 'Product added to your cart :)',
    })
    })
   }
    
  }

}
