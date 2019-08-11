import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
myForm:FormGroup
checkpass;
resData;
Cflip;
  constructor(private fb:FormBuilder, private logser:LoginService,private router:Router) { }

  ngOnInit() {
  	this.validate();
  }
validate(){
	this.myForm=this.fb.group({
		'oldpass':['',Validators.required],
		'newpass':['',Validators.required],
		'confirmnewpass':['',Validators.required]
	})	
}



matchpassword(){

let	newpass=this.myForm.controls.newpass.value;
let confirmnewpass=this.myForm.controls.confirmnewpass.value;
if(newpass==confirmnewpass)
{


	const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false,
})

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, change it!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {
  		/// saving PAssword to DB
  			let formData=new FormData();
		// let uname=
	    formData.append('oldpass',this.myForm.controls.oldpass.value);
	    formData.append('newpass',this.myForm.controls.newpass.value);
	    formData.append('uname',localStorage.getItem('uname'));
	     console.log(this.myForm.controls.oldpass.value);
	    this.logser.changepass(formData)
	    .subscribe(res=>
	      {
	      	this.resData=res;
	      	
	if(this.resData.err==0){

		  Swal.fire({
		  position: 'center',
		  type: 'success',
		  title: 'Password saved successfully!',
		  showConfirmButton: false,
		  timer: 1500
			})

	        this.router.navigate(['/dashboard']);
			}
			else{
					Swal.fire({
	  position: 'center',
	  type: 'error',
	  title: "Old password didn't match",
	  showConfirmButton: false,
	  timer: 1500
	})
			}
	      })

    // swalWithBootstrapButtons.fire(
    //   'Deleted!',
    //   'Your file has been deleted.',
    //   'success'
    // )

  } else if (
    // Read more about handling dismissals
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Cancelled',
      'Password not changed :)',
      'error'
    )
  }
})


	


}
else
{
	this.Cflip=false;
this.checkpass="data";
this.Cflip=true;
}

}

clearErr(){
	this.checkpass=undefined;
}




}
