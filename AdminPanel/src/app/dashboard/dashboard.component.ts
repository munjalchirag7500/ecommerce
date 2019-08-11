import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 username;
  constructor(private router:Router) { }
  logOut()
   {
    console.log("logging out")
      /////
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: true,
})

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: "Do you want to logout ?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, Logout!',
  cancelButtonText: 'No, cancel!',
  reverseButtons: true
}).then((result) => {
  if (result.value) {

    localStorage.removeItem('uname');
      this.router.navigate(['/']);

    swalWithBootstrapButtons.fire(
      'Login Again',
      'You are logged out successfully',
      'success'
    )
  } else if (
    // Read more about handling dismissals
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire(
      'Error',
      'User cancelled the operation'
    )
  }
})


/////////////////

   }
currentDate;
  ngOnInit() {
      this.currentDate=new Date();
    console.log(this.currentDate);

  	this.username=localStorage.getItem('uname');
  
  
  }

  
  
  
  



}
