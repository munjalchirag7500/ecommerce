import { Component, OnInit } from '@angular/core';
import { SearchService} from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

keyword;
resData;
searchData;
noDataFound;

  constructor(private srchser:SearchService) { }

  ngOnInit() {

  	this.keyword=localStorage.getItem('search');
  	localStorage.removeItem('search');
  	console.log("find "+this.keyword)

  	this.srchser.fetchSearchData(this.keyword)
  	.subscribe(res=>{
  		console.log(res);
      this.resData=res;
      this.searchData=this.resData.sdata;
      console.log(this.searchData)
      if(this.searchData.length==0)
        {
          this.noDataFound="true";
        }

  	})

  }

}
