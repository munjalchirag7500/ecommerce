import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { LoginsignupService } from 'src/app/services/loginsignup.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	mySignUpForm : FormGroup;
	mySignInForm : FormGroup;


	constructor(private fb:FormBuilder,private lser:LoginsignupService,private router:Router) { }

	ngOnInit() {
		this.signUpValidate();
		this.signInValidate();

	}

	signUpButton = document.getElementById('signUp');
	signInButton = document.getElementById('signIn');
	container = document.getElementById('container');
	isActive;   // checkin right panel activeness
	signInSlide(){
			console.log("sliding to SignIn Form");
			// container.classList.remove("right-panel-active");
			this.isActive = false;
	}

	signUpSlide(){
			console.log("sliding to signUp Form");
			// container.classList.add("right-panel-active");
			this.isActive= true;
	}

//clearing err message in sign in 
clearErr(){
	this.signinErr=undefined;
}


// login 
	signinRes;
	signinErr;
	signIn(){  
		console.log("sign in clicked");
		if(localStorage.getItem('loginStat')=="true"){
			Swal.fire({
				position: 'center',
				type: 'error',
				title: 'Already logged in',
				showConfirmButton: false,
				timer: 1500
			  })
		}   
		else{
			
			let signInDetails={
					'inemail':this.mySignInForm.controls.inEmail.value,
					'inpassword':this.mySignInForm.controls.inPassword.value
			}
			console.log(signInDetails);
			this.lser.userlogin(signInDetails)
			.subscribe(res=>{

				console.log(res);
				this.signinRes=res;
				if(this.signinRes.err==0){
				localStorage.setItem('loginStat',"true");
				localStorage.setItem('loginChecker','true');
				localStorage.setItem('username',this.signinRes.username);
				localStorage.setItem('email',this.signinRes.email);
				Swal.fire({
					position: 'center',
					type: 'success',
					title: 'fetching profile data ...',
					showConfirmButton: false,
					timer: 1500
				  })
					localStorage.setItem('reload','true')
				  this.router.navigate(['/']);


				}
				else{
					console.log(this.signinRes.msg);
					this.signinErr="err";
				}
			})
		}    

	}


//signup
	signupSuccessMessage;
	signupFailMessage;
	signupRes;
	signUp()
	{
		console.log("sign up clicked");
		// console.log(this.mySignUpForm.controls.upName);
		let signUpDetails=
		{
			'upname':this.mySignUpForm.controls.upName.value,
			'upemail':this.mySignUpForm.controls.upEmail.value,
			'uppassword':this.mySignUpForm.controls.upPassword.value
		}
		// console.log(signUpDetails);
		this.lser.usersignup(signUpDetails)
		.subscribe(res=>{
			console.log(res);
			this.signupRes=res;
			if(this.signupRes.err==0)
			{
				this.signupSuccessMessage="true";	
				this.signupFailMessage=undefined;
			}
			console.log(this.signupSuccessMessage)

		})
		if(this.signupSuccessMessage==undefined){
			this.signupFailMessage="true";
			
		}
		
		
	}

	clearSuccessMessage(){
		console.log("success cleared on keypress");
		this.signupSuccessMessage=undefined;
	}

	

	signUpValidate(){
		this.mySignUpForm=this.fb.group({
			'upName':['',Validators.required],
			'upEmail':['',Validators.required],
			'upPassword':['',Validators.required]
		})
	}


	signInValidate(){
		this.mySignInForm=this.fb.group({
			'inEmail':['',Validators.required],
			'inPassword':['',Validators.required]
		})
	}

}
