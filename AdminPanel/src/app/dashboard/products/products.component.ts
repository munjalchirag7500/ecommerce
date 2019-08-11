import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,Validators } from '@angular/forms';
import { ProductsService} from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
resData;
proData;
myForm:FormGroup;
proCat;
proSel;
notSelected;
categoryArr=[];
  constructor(private pser:ProductsService,private fb:FormBuilder) { }

  ngOnInit() {
    this.proCat="no";
    this.notSelected="no";
  	this.validate();
     
  this.pser.fetchProductData()
  .subscribe(res=>{
  	this.resData=res;
  	if(this.resData.err==0){
  		this.proData=this.resData.pdata;
  		console.log(this.proData);

      //removing duplicate categries from appearing in the select list
      if(this.proData.length>1)
      {

        let unique=this.proData[0].productCategory;
        this.categoryArr[0]=unique;
        let categoryCounter=1;
        for(let i=1;i<this.proData.length;i++)
        {
           unique=this.proData[i].productCategory;
          if(unique!=this.proData[i-1].productCategory)
          {
            this.categoryArr[categoryCounter]=unique;
            categoryCounter++;
          }
        }
        console.log(this.categoryArr);

      }



  	}
  	else{
  		console.log("error in fetching product data");
  	}
  })



  }
 
validate(){
  	this.myForm=this.fb.group(
  	{
  		'category':['',]
  	})
  }

proFilter()
{   
  if(this.myForm.controls.category.value.length>0){
	this.proCat=this.myForm.controls.category.value;
	console.log("working "+this.proCat);
  this.proSel="bycat";
}
else{
   this.proCat="no";
    this.notSelected="no";
}

}



catData;
msg;

  delpro(id){
    this.pser.deleteProduct(id)
    .subscribe(res=>{
      this.resData=res;
      if(this.resData.err==0)
      {
        this.msg=this.resData.msg;
        this.pser.fetchProductData()
        .subscribe(res=>{
          this.resData=res;
          if(this.resData.err==0){
            this.proData=this.resData.pdata;
            console.log(this.proData);
          }
        })
      }
      else{
        this.msg="error in deleting category";
        console.log(this.msg);
      }
    })
  }

path;
  lrgImgPath(p){
    console.log(p);
    this.path="http://localhost:7788/images/"+p;
    console.log(this.path);
  }


}
