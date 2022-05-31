import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/User-Service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  invalidCredentials=false;
  loginForm: FormGroup;
  
  constructor(private router:Router,private userService:UserService) {
   }

  ngOnInit() {
      //initializing validators
      this.loginForm  = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
      });
      
  }

  //To show and hide password field
  showPassword()
  {
    var id='password';
    var visible= <HTMLInputElement>document.getElementById(id);
    visible.type=="text"?visible.type="password":visible.type="text";
  }

  //onSubmit event login
  login() {

    this.userService.Login(this.loginForm.value)
    .subscribe(success=>{
      if(!success){
        this.invalidCredentials = true;
        this.router.navigateByUrl("/");
      }
      else{
        this.router.navigateByUrl("/user-dashboard");
      }
    });

    }
}
