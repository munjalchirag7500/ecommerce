import { Component, OnInit } from '@angular/core';
import { FeedbackService} from 'src/app/services/feedback.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
resData;
feedData;
  constructor(private fser : FeedbackService) { }

  ngOnInit() {

  			this.fser.getFeedback()
  			.subscribe(res=>{
  				this.resData=res;
  				this.feedData=this.resData.fdata;
  			})
  }

}
