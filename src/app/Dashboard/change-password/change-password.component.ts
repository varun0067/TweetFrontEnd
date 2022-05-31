import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/User-Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor( private userService:UserService,private router:Router) { }

  changePasswordForm;
  
  ngOnInit(): void {
    this.changePasswordForm  = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('',[Validators.required]),
      newPassword: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required]),
      });
  }

  changePassword() {

    this.changePasswordForm.value.username=sessionStorage.getItem("username");
    if(this.changePasswordForm.value.newPassword!=this.changePasswordForm.value.confirmPassword)
    {
      alert("Passwords not matching!");
      return;
    }
  
     this.userService.changePassword(this.changePasswordForm.value).subscribe(res=>{
      if(res==true){
        alert("Password Updated");
        this.changePasswordForm.reset();
      }else{
        alert("Sorry couldnt change password!!. Try Agian.");;
      } 
      this.router.navigateByUrl("user-dashboard");
    });
  
     }
}
