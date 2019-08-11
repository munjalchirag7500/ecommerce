import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import {ProductsService} from 'src/app/services/products.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
myForm:FormGroup;
pro_id;
p_id;
resData;
  constructor(private fb:FormBuilder , private pser:ProductsService , private router:Router,private ar:ActivatedRoute) { }
fetchedProCat;
fetchedProImg;
fetchedData;
fetchedcatData;
  ngOnInit() {

  	this.validate();

 	this.ar.params.subscribe(par=>{

  		this.pro_id=par.pid;
  		console.log("parObj")
  		console.log(par);
  		this.p_id=par.pid;
  		this.pser.fetchproById(this.pro_id)
  		.subscribe(res=>{
  			this.resData=res;
  				if(this.resData.err == 0)
  				{
  			console.log("pro data fetched by Id success");
  			console.log(res);
  			this.fetchedProCat=this.resData.pdata[0].productCategory;
  			this.fetchedProImg=this.resData.pdata[0].image;
  			this.fetchedcatData=this.resData.catListData;
  			console.log(this.fetchedProCat);
  			console.log(this.fetchedProImg);
  			console.log(this.fetchedcatData)
  			this.myForm.patchValue(this.resData.pdata[0]);
  				}
  				else{
  					console.log("err in proData fetching byID");
  				}
  		})

  	})

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
myImage;
imgSize;
imgName;

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


editProduct(){
if( this.myImage==undefined){
// if  no img

	let frmData={
    'pname':this.myForm.controls.pname.value,
    'description':this.myForm.controls.description.value,
    'category':this.myForm.controls.category.value,
    'price':this.myForm.controls.price.value,
    'brand':this.myForm.controls.brand.value,
    'id':this.pro_id
				}

    console.log(this.pro_id);
    console.log(frmData)
    this.pser.saveEditProductNoImg(frmData)
    .subscribe(res=>
      {
console.log(res);
      	Swal.fire({
  position: 'center',
  type: 'success',
  title: 'Changes saved successfully!',
  showConfirmButton: false,
  timer: 1500
})

        this.router.navigate(['/dashboard/products']);
      })
	}


	else
	{
// if img
console.log(" changing img also");

	let formData=new FormData();
    formData.append('pname',this.myForm.controls.pname.value);
    formData.append('price',this.myForm.controls.price.value);
    formData.append('brand',this.myForm.controls.brand.value);
    formData.append('description',this.myForm.controls.description.value);
    formData.append('category',this.myForm.controls.category.value);
    formData.append('Image',this.myImage);
    formData.append('id',this.pro_id);

    console.log(this.pro_id);
    console.log(formData)
    this.pser.saveEditProductWithImg(formData)
    .subscribe(res=>
      {
console.log(res);
      	Swal.fire({
  position: 'center',
  type: 'success',
  title: 'Changes saved successfully!',
  showConfirmButton: false,
  timer: 1500
})

        this.router.navigate(['/dashboard/products']);
      })





	}
}


}
