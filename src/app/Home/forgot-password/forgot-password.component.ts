import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/User-Service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  
  constructor(private router:Router,private userService:UserService) {
  }

 ngOnInit() {
     //initializing validators
     this.forgotPasswordForm  = new FormGroup({
     username: new FormControl('',),
     password: new FormControl('',[Validators.required]),
     newPassword: new FormControl('',[Validators.required]),
     dateOfBirth: new FormControl('',[Validators.required])
     });
     
 }


 //onSubmit event login
 forgotPassword() {

  if(this.forgotPasswordForm.value.password!=this.forgotPasswordForm.value.newPassword)
  {
    alert("Passwords not matching!");
    return;
  }

   this.userService.forgotPassword(this.forgotPasswordForm.value).subscribe(res=>{
    if(res==true){
      alert("Password Updated");
      this.forgotPasswordForm.reset();
    }else{
      alert("Sorry couldnt change password!!. Try Agian.");;
    } 
    this.router.navigateByUrl("");
  });

   }

}
