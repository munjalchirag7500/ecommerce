import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from 'src/app/dashboard/category/category.component';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.component.html',
  styleUrls: ['./userlog.component.css']
})
export class UserlogComponent implements OnInit {
resData;
userData;
userLog;
  constructor(private cser:LoginService) { }

  ngOnInit() {
    this.cser.getuserlog().subscribe(res=>{
      this.resData=res;
      console.log(this.resData);
      if(this.resData.err==0){
        this.userData=this.resData.msg;        
        console.log(this.userData);
      }
    })
  }

}
