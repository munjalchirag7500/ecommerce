import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import {ChatService} from 'src/app/services/chat.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  constructor(private fb:FormBuilder , private chatser : ChatService) { }
adminReply:FormGroup

replyTo;


adminSide;
userSide;

clearMsgFetch;

  ngOnInit() {

  	this.validate();

  	this.replyTo=localStorage.getItem('replyto')
  	localStorage.removeItem('replyto');
  

      //     this.chatser.fetchAdminMsg(this.replyTo)
      // .subscribe(res=>{
      //   console.log(res);
      //   this.resUserMsgData=res;
      //   console.log(this.resUserMsgData)
      //   this.resUserMsg=this.resUserMsgData.data;
      //   console.log(this.resUserMsg)

      // })
  



          // fetching the  messages on in it


           this.fetchChats();
          this.clearMsgFetch = setInterval(() => {
                this.fetchChats(); 
                }, 4000);

  }


  ngOnDestroy() {
  if (this.clearMsgFetch) {
    clearInterval(this.clearMsgFetch);
  }
}


  // 
  fetchChats(){
          this.chatser.fetchAdminMsg(this.replyTo)
      .subscribe(res=>{
        console.log(res);
        this.resUserMsgData=res;
        console.log(this.resUserMsgData)
        this.resUserMsg=this.resUserMsgData.data;
        console.log(this.resUserMsg)

      })
  }

  //form validation

  validate(){
  	this.adminReply=this.fb.group({
  		'admintext' :['',Validators.required]
  	})
  }

  // admin sending message to user
resUserMsgData;
resUserMsg;

  adminSend(){
  	console.log(this.adminReply.controls.admintext.value)


  	let msgData={
  		'name':"Admin "+localStorage.getItem('uname'),
  		'email':this.replyTo,
  		'msg':this.adminReply.controls.admintext.value
  	}
  	// this.userMessage.controls.usertext.value="";
  	console.log(msgData)



  	this.chatser.saveAdminChat(msgData)
  	.subscribe(res=>{
  		console.log(res);


  		// fetching the current messages

  		this.chatser.fetchAdminMsg(this.replyTo)
  		.subscribe(res=>{
  			console.log(res);
  			this.resUserMsgData=res;
  			console.log(this.resUserMsgData)
  			this.resUserMsg=this.resUserMsgData.data;
  			console.log(this.resUserMsg)

          // clearing the text area after message is sent
        // document.getElementById("chatbox").value = "";
  		})

  	})


  }

}
