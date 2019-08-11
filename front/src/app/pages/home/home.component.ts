import { Component, OnInit } from '@angular/core';
import {ProductsService} from  'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

resLatestPro;
loginStat;          // checking login status

  constructor(private pser :ProductsService) { }

  ngOnInit() {

    if(localStorage.getItem('reloadOnLogout')=="true")
      {
        localStorage.removeItem('reloadOnLogout');
        location.reload();
      }
    
    if(localStorage.getItem('loginChecker')!="true")
    {
      this.loginStat = "false";
      localStorage.setItem('loginStat',this.loginStat);
    }
    if(localStorage.getItem('reload')=="true")
    {
      localStorage.removeItem('reload');
      location.reload();
    }



console.log(localStorage.getItem('loginStat')+"from home");

  // fetching latest products on init 
    this.pser.fetchLatestProducts()
    .subscribe(res=>{
      this.resLatestPro=res;
      this.resLatestPro=this.resLatestPro.latestpro;
      console.log(this.resLatestPro);
    })
  ///////

  }

}
