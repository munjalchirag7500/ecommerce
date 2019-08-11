import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
find:FormGroup

resCatData;
cnames;
route;
joinbtn;
checkLogin;
myAcc;
myLogin;
totalProductsInCart;
Myorder;

  constructor(private cser:CategoryService,private router :Router,private fb:FormBuilder) { }

  ngOnInit() {

    this.Validate();
   
    if(localStorage.getItem('loginStat')=="true")
    {
     
      // this.joinbtn="Lout";
      this.checkLogin="true";
      this.myAcc=localStorage.getItem('username');
      this.myLogin="Logout";
      this.totalProductsInCart=localStorage.getItem('cartItems');
      this.Myorder="true"


    }
    else
    {
       this.myLogin="Login";
      this.myAcc="My Account";
      this.totalProductsInCart = 0;

      // this.joinbtn="JOIN";
      // this.checkLogin=undefined;

    }
    // fetching category all data on init to get categogry names
      // fetching latest products on init 
      this.cser.fetchCatData()
      .subscribe(res=>{
        this.resCatData=res;
        this.cnames=this.resCatData.cdata;
        console.log(this.cnames);
      })
    ///////
  }

  ///go to cart or redirect to login page

  cartRedirection(){
    let loginCheck=localStorage.getItem('loginStat');
    if(loginCheck=="true"){
       this.router.navigate(['/cart']);
    }
    else 
    {
      console.log("Redirecting to login page");
      console.log("redirecting to cart");
      Swal.fire({
        position: 'center',
        type: 'error',
        title: 'Your cart is empty , login to add products to cart',
        showConfirmButton: false
        
      })
      this.router.navigate(['/login']);
    }
  }


  logout(){
    if(localStorage.getItem('loginStat')=="true")
    {
    console.log("logging out");
    localStorage.setItem('loginStat',"false");
    localStorage.setItem('loginChecker',"false");
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('cartItems');
    
    this.checkLogin=undefined;
    
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Logging out please wait ...',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.setItem('reloadOnLogout',"true");
     this.router.navigate(['/']);
  }

  else{

    this.router.navigate(['/login']);
  }
  }


  goToProfile(){
    if(localStorage.getItem('loginStat')=="true")
    {
      console.log("redirecting to profile section");
      this.router.navigate(['/profile']);
    }
    else
    {
      console.log("redirecting to login page");
      this.router.navigate(['/login'])
    }
  }


  //validate search
  Validate(){
    this.find=this.fb.group({
      'keyword':['',Validators.required]
    })

  }

 // for searching
  search(){
    console.log("searching for");
    console.log(this.find.controls.keyword.value);
    localStorage.setItem('search',this.find.controls.keyword.value)
    if(localStorage.getItem('search'))
    {
      localStorage.setItem('searchNav',"true")
    this.router.navigate(['/feedback'])
    }
  }

  chat(){
    console.log("chat clicked")
    if(localStorage.getItem('loginStat')=="true")
      {this.router.navigate(['/chat'])}

    else{
      this.router.navigate(['/login'])
    }
  }

}
