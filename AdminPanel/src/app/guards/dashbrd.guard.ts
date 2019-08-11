import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import {Router } from '@angular/router';
import Swal from 'sweetalert2';
 
@Injectable({
  providedIn: 'root'
})
export class DashbrdGuard implements CanActivate {
	constructor(private router:Router){}
check;
	canActivate()
	{
		
		this.check=localStorage.getItem('uname');
		
		if(this.check=="undefined" || this.check==null)
		{
			localStorage.removeItem('uname');
			Swal.fire("Oops","You are not authorized to access this page",'error');
			this.router.navigate(['/']);
			
		}
		else
		{
			
			Swal.fire({
				position: 'center',
				type: 'success',
				title: 'Your are successfully logged in',
				showConfirmButton: false,
				timer: 1500
			  });
			  return true;
		}
	}
 






}
