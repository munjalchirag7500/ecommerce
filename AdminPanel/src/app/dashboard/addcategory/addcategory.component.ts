import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import {CategoryService} from 'src/app/services/category.service';
import Swal  from  'sweetalert2';
import {Router} from '@angular/router';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
myForm:FormGroup;
myImage;
imgName;
imgSize;
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

  constructor(private fb:FormBuilder, private catser:CategoryService,private routSer :Router) { }

  ngOnInit() {
  	this.validate();
  }

  validate()
  {
  	this.myForm=this.fb.group(
		{
			'cname':['',Validators.required],
			'description':['',Validators.required]
		}
  		)
  }

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

  addFormCategory()
  {
    if(this.imgName==undefined)
    {
      Swal.fire({
  type: 'error',
  title: 'Oops...',
  text: 'Select Image before submitting !',
})
    }
    else{
    let formData=new FormData();
    formData.append('cname',this.myForm.controls.cname.value);
    formData.append('description',this.myForm.controls.description.value);
    formData.append('Image',this.myImage);
    this.catser.addCat(formData)
    .subscribe(res=>
      {
        console.log(res);
        Swal.fire({
  position: 'center',
  type: 'success',
  title: 'Category saved successfully!',
  showConfirmButton: false,
  timer: 1500
})

this.routSer.navigate(['/dashboard/category']);
  
})
  }
   }

 // reset(){
 //    this.feedback=null;
 //  }
 //  setTimeout("reset()",3000);

}
