import { Component, OnInit } from '@angular/core';
import {ProfileService} from 'src/app/services/profile.service';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
username;
email;
notUpdated;
resData;


myImage;
imgName;
imgSize;

profilePic;
profileMob;
profileAdd;
profileDOB;

address:FormGroup;
mobile:FormGroup;
date:FormGroup;



  constructor(private pser:ProfileService , private fb:FormBuilder) { }
startDate = new Date(1990, 0, 1);
  ngOnInit() {
this.username=localStorage.getItem('username');
this.email=localStorage.getItem('email');


			
			let id={'email':this.email}
		// checking for profile compeletion
		this.pser.checkProfile(id)
		.subscribe(res=>{
			console.log(res);
			this.resData=res;

			if(this.resData.err == 1)
			{   this.profilePic="assets/profile/images/profile.png";
					this.notUpdated=true;
					this.validateAdd();
					this.validateMobile();
					this.validateDate();

			}
			else
			{		console.log(this.resData.data[0].image)

					this.profilePic="http://localhost:7788/images/"+this.resData.data[0].image;
					this.profileDOB=this.resData.data[0].dob;
					this.profileAdd=this.resData.data[0].address;
					this.profileMob=this.resData.data[0].mobile;
			}

		})


  }




  // validating all form components

  validateAdd(){
  	this.address=this.fb.group({
  		'city':['',Validators.required],
  		'street':['',Validators.required],
  		'pin':['',Validators.required]
  	})
  }

  validateMobile(){
  	this.mobile=this.fb.group({
  		'num':['',Validators.required]
  	})
  }

  validateDate(){
  	this.date=this.fb.group({
  		'dob':['',Validators.required]
  	})
  }

// update profile data
 formInvalid;
  updateProfile()
  {

	  	console.log("validating data...");

	  	if(this.mobile.controls.num.value.length<10 || this.date.controls.dob.value.length==0 )
	  	{
	  		console.log("Wrong data");
	  		this.formInvalid="true";
	  	}
	  	else{
	  		console.log("data is valid proceeding to update");
	  		let fullAdd=this.address.controls.street.value+" ,"+this.address.controls.city.value+" ("+this.address.controls.pin.value+")"
	  		 let formData=new FormData();
				    formData.append('address',fullAdd);
				    formData.append('phone',this.mobile.controls.num.value);
				    formData.append('Image',this.myImage);
				    formData.append('dob',this.date.controls.dob.value);
				    formData.append('email',localStorage.getItem('email'));
				    formData.append('name',localStorage.getItem('username'));
				    
				    console.log(this.mobile.controls.num.value)



				    console.log(formData);
				    console.log(fullAdd);
				    this.pser.updateProfile(formData)
				    .subscribe(res=>{
				    	console.log(res);
              location.reload();
				    })
	  	}




  }

  clearFormInv(){
  	this.formInvalid=undefined;
  }


  //image show start

public imagePath;
imgURL: any;
public message: string;

preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

//img show end

  fileUpload(event)
  {
  	if(event.target.files.length>0)
  	{
  		this.myImage=event.target.files[0];
  		console.log(this.myImage);
      this.imgName=this.myImage.name;
      this.imgSize=this.myImage.size;
      console.log(this.imgName);
  	}
  }

}
