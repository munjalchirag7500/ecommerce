import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';


 
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
resData;
catData;
msg;
lrgImg;

  constructor(private catSer :CategoryService) { }

  ngOnInit() {
  	this.catSer.getCat()
  	.subscribe(res=>{
  		// console.log(res);
  		this.resData=res;
  		if(this.resData.err==0){
  			this.catData=this.resData.cdata;
  			console.log(this.catData);
  		}
  	})
  }

  delcat(id){
    this.catSer.deletecategory(id)
    .subscribe(res=>{
      this.resData=res;
      if(this.resData.err==0)
      {
        this.msg=this.resData.msg;
        this.catSer.getCat()
        .subscribe(res=>{
          this.resData=res;
          if(this.resData.err==0){
            this.catData=this.resData.cdata;
            console.log(this.catData);
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

  // readmore(des){
  //   console.log(des);
  //   this.defaultDes=des;
  //   console.log(this.readmoreLen);
  //   this.readmoreLen=200;
  //   console.log(this.readmoreLen);
  // }



}
