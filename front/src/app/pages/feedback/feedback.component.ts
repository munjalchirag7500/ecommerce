import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup,FormBuilder } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  
  constructor(private _formBuilder:FormBuilder,private fser:FeedbackService ,private router:Router ) { }

  ngOnInit() {


    if(localStorage.getItem('searchNav')=="true")
    {
      localStorage.removeItem('searchNav');
      this.router.navigate(['/search'])
    }

    if(localStorage.getItem('tempRoute')=="true")
    {
      localStorage.removeItem('tempRoute');
      this.router.navigate(['/cart']);
    }

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['',[Validators.required,Validators.pattern('^(?=.*[@])[a-zA-Z0-9@._]{11,100}$')]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

  }
 
  submit(){
    console.log("Submitted"+this.firstFormGroup.controls.firstCtrl.value);
    let feedData;
    feedData=
    {
      'name':this.firstFormGroup.controls.firstCtrl.value,
      'email':this.secondFormGroup.controls.secondCtrl.value,
      'subject':this.thirdFormGroup.controls.thirdCtrl.value,
      'feedback':this.fourthFormGroup.controls.fourthCtrl.value
    }
    console.log(feedData);
    this.fser.sendFeedback(feedData)
    .subscribe(res=>{
      console.log(res);
    })

    

  }

}
