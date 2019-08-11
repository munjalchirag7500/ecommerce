import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  pro_cname;
  resData;
  constructor(private ar:ActivatedRoute,private pser:ProductsService) { }

  ngOnInit() {


    //// fetching the category name from params and sending to db to get related products
    this.ar.params.subscribe(par=>{
  		this.pro_cname=par.cname;
  		// this.c_id=par.cid;
  		this.pser.fetchProWithCname(this.pro_cname)
  		.subscribe(res=>{
        this.resData=res;
        console.log("fetched");
        console.log(res);
        this.resData=this.resData.cdata;
  		})

    })
    ////

  }

}
