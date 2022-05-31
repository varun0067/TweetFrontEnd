import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../Service/User-Service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService:UserService,private router:Router) { }

  canActivate():boolean{
    if(this.userService.LoggedIn()){
      return true;
    }
    else{
      alert("Please login!!");
      this.router.navigateByUrl("");
      return false;
    }
  }
}
