import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
myForm:FormGroup;
resData;
errMsg

  constructor(private fb:FormBuilder,private lser:LoginService,private router:Router) { }
  signup() {
    // body...
    let formData=this.myForm.getRawValue();
    this.lser.adminSignData(formData)
    .subscribe(res=>{
     // console.log(res);
     this.resData=res;
     if(this.resData.err==0)
     {
       
      console.log(this.resData);
      Swal.fire("Data Saved","","success");
      this.router.navigate(['/']);
     }
     if(this.resData.err==1)
     {
      Swal.fire("OOPS",this.errMsg,"error")
     }
    },err=>{
      console.log("api error");
    });
    
  }
  ngOnInit() {
    this.validate();
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
