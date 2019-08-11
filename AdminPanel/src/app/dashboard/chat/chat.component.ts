import { Component, OnInit } from '@angular/core';
import {ChatService} from 'src/app/services/chat.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatser:ChatService,private router :Router) { }

  resData;
  resUserData;
  reqArr=[];    //requested or needed array in html file
  ngOnInit() {

  	this.chatser.fetchChatReq()
  	.subscribe(res=>{
  		console.log(res);
  		this.resData=res;
  		this.resUserData=this.resData.data;

  		      //removing duplicate categries from appearing in the select list
      // if(this.resUserData.length>1)
      // {

      //   let unique=this.resUserData[0].name +" ( "+this.resUserData[0].email+" )";
      //   this.reqArr[0]=unique;
      //   let categoryCounter=1;
      //   for(let i=1;i<this.resUserData.length;i++)
      //   {
      //      unique=this.resUserData[i].name+" ( "+this.resUserData[i].email+" )";
      //     if(unique!=this.resUserData[i-1].name+" ( "+this.resUserData[i].email+" )")
      //     {
      //       this.reqArr[categoryCounter]=unique;
      //       categoryCounter++;
      //     }
      //   }
      //   console.log(this.reqArr);

      // }




  	})

  }


  reply(user_email){
    console.log(user_email)
    // console.log(user)
    // let arr=user.split(" ")
    // console.log(arr[3])
    localStorage.setItem('replyto',user_email);
    this.router.navigate(['../dashboard/reply'])
  }

}
