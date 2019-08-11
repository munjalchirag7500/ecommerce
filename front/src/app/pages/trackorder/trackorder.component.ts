import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TrackorderService } from 'src/app/services/trackorder.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.css']
})
export class TrackorderComponent implements OnInit {

  constructor(private ar:ActivatedRoute , private todr : TrackorderService , private router:Router) { }

orderId;
resData;
orderData = [];
date_ordered;
deliveryAdd;
resAddData;
deliveryDate;

  ngOnInit() {
  	//fetch orderId using params

  	 // this.ar.params.subscribe(par=>{
  		// this.orderId=par.orderid;
  		// })

  		// get order data; todr mean trackorder service
  		this.todr.getOrderData(localStorage.getItem('email'))
  		.subscribe(res=>{
  			console.log(res)
  			this.resData=res;
        console.log("resData.data=")
        console.log(this.resData.data)
  			this.resData=this.resData.data
        let t=0;
        for(let i=0;i<this.resData.length;i++)
        {
          for(let j=0;j<this.resData[i].oData.length;j++)
          {
            console.log("length="+this.resData[i].oData.length);
            this.orderData[t]=this.resData[i].oData[j];
            t++;
          }
        }

  			// this.orderData=this.resData.oData;
  			console.log(this.orderData)
  			// this.date_ordered=this.resData.date_ordered;
        // this.orderId=this.resData.orderId
  			// console.log(this.date_ordered)
  		})

  		//get address
  		this.todr.getAdd(localStorage.getItem('email'))
  		.subscribe(res=>{
  			console.log(res)
  			this.resAddData=res;
  			this.deliveryAdd=this.resAddData.data[0].address

  		})

  			

  		


  	}
  }


