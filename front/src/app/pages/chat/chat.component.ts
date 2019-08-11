import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
userMessage:FormGroup

items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  constructor(private fb:FormBuilder, private chatser:ChatService) { }
adminWrite;
userWrite;
clearMsgFetch;
  ngOnInit() {

  	this.validate();
  	this.adminWrite = "Hello,"+localStorage.getItem('username')+"\n"+"how I can help you";

  	 		//fetching the  messages on init


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


// fetching chats every second

fetchChats(){
	  		this.chatser.fetchUserMsg(localStorage.getItem('email'))
  		.subscribe(res=>{
  			console.log(res);
  			this.resUserMsgData=res;
  			console.log(this.resUserMsgData)
  			this.resUserMsg=this.resUserMsgData.data;
  			console.log(this.resUserMsg)

  		})
}



  validate(){
  	this.userMessage=this.fb.group({
  		'usertext':['',Validators.required]
  	})
  }


  resUserMsg;
  resUserMsgData;

  userSend(){
  	console.log(this.userMessage.controls.usertext.value);
  	let tempMes=this.userMessage.controls.usertext.value;

  	let msgData={
  		'name':localStorage.getItem('username'),
  		'email':localStorage.getItem('email'),
  		'msg':tempMes
  	}
  	// this.userMessage.controls.usertext.value="";
  	console.log(msgData)



  	this.chatser.saveUserChat(msgData)
  	.subscribe(res=>{
  		console.log(res);


  		//fetching the current messages

  		this.chatser.fetchUserMsg(localStorage.getItem('email'))
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
