import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
myForm:FormGroup;
cat_id;
c_id;
resData;
  constructor(private fb:FormBuilder,private ar:ActivatedRoute,private cser:CategoryService,
  	private router:Router) { }

  ngOnInit() {
  	this.validate();

  	//to get the default data
  	this.ar.params.subscribe(par=>{
  		this.cat_id=par.cid;
  		this.c_id=par.cid;
  		this.cser.fetchcatById(this.cat_id)
  		.subscribe(res=>{
  			this.resData=res;
  			this.myForm.patchValue(this.resData.cdata[0]);
  		})

  	})
  }
validate(){
	this.myForm=this.fb.group({
		'cname':['',Validators.required],
		'description':['',Validators.required]
	})
}


editFormCategory(){

	let formData=new FormData();
    formData.append('cname',this.myForm.controls.cname.value);
    formData.append('description',this.myForm.controls.description.value);
    formData.append('id',this.c_id);
    console.log(this.c_id);
    this.cser.saveEditCat(formData)
    .subscribe(res=>
      {

      	Swal.fire({
  position: 'center',
  type: 'success',
  title: 'Changes saved successfully!',
  showConfirmButton: false,
  timer: 1500
})

        this.router.navigate(['/dashboard/category']);
      })
}

}
