import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder , Validators} from '@angular/forms';
import {LoginService} from 'src/app/services/login.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
myForm:FormGroup
resData;
errMsg;
  constructor(private fb:FormBuilder , private lser:LoginService, private router :Router) { }
loginData() {
    // body...
    let formData=this.myForm.getRawValue();
    this.lser.adminLoginData(formData)
    .subscribe(res=>{
     // console.log(res);
     this.resData=res;
     if(this.resData.err==0)
     {
       
      localStorage.setItem('uname',this.resData.username);
      console.log(this.resData.username);
      this.router.navigate(['/dashboard']);
     }
     if(this.resData.err==1)
     {
      localStorage.setItem('grd','f');   ////
      this.errMsg=this.resData.msg;
      Swal.fire("OOPS",this.errMsg,"error")
     }
    },err=>{
      console.log("api error");
    });
    
  }

  ngOnInit() {
  this.validate();
  if(localStorage.getItem('uname')!=undefined){
    this.router.navigate(['/dashboard']);

  }
  }


   validate()
  {
    this.myForm=this.fb.group
    (
	    {
	    		'name'   : ['',Validators.required],
	    		'pass'   : ['',Validators.required]
	    }		
    ) 	
  }

}
