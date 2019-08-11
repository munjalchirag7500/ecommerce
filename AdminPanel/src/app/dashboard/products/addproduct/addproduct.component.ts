import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import {ProductsService} from 'src/app/services/products.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
myForm:FormGroup;
myImage;
imgName;
imgSize;
checkErrProFetch;
  constructor(private fb:FormBuilder , private pser :ProductsService , private router:Router) { }

  ngOnInit() {
  	  	this.validate();
  	  	this.fetchCategoryName();

  }


   validate()
  {
  	this.myForm=this.fb.group({
  		'pname'			:['',Validators.required],
  		'description'   :['',Validators.required],
  		'brand'			:['',Validators.required],
  		'price' 		:['',[Validators.required,Validators.pattern('^[0-9]{1,20}$')]],
  		'category'		:['',Validators.required]


  	})
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

catNameData;
  fetchCategoryName(){
  	this.pser.fetchCatNames()
  	.subscribe(res=>{
  		this.catNameData=res;
  		this.catNameData=this.catNameData.cdata ;
  		console.log(this.catNameData);
  	})
  }

productDetails;
  addProduct(){
  		
  	// this.productDetails=this.myForm.getRawValue();
  	// console.log(this.myForm.getRawValue());	
  	// let e = document.getElementById("MySelectOption");
   //   let proCat = e.options[e.selectedIndex].value;
   //       console.log(proCat);

    let formData=new FormData();
    formData.append('pname',this.myForm.controls.pname.value);
    formData.append('price',this.myForm.controls.price.value);
    formData.append('brand',this.myForm.controls.brand.value);
    formData.append('description',this.myForm.controls.description.value);
    formData.append('proCat',this.myForm.controls.category.value);
    formData.append('Image',this.myImage);

    this.pser.addProductData(formData)
    .subscribe(res=>
      {
        this.checkErrProFetch=res;
        console.log(res);
        if(this.checkErrProFetch.err==0){
        Swal.fire({
  position: 'center',
  type: 'success',
  title: 'Product saved successfully!',
  showConfirmButton: false,
  timer: 1500
})
        this.router.navigate(['/dashboard/products']);
      }
      else{
             Swal.fire({
  position: 'center',
  type: 'error',
  title: 'Product save failed',
  showConfirmButton: false,
  timer: 1500
})     
      }


  
})

  }

}
