import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/User-Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) { }

  registrationForm:FormGroup;
  Usernames:string[];
  Emails:string[];
  imageBase64;

  ngOnInit(): void {
      
    //initializing validations
      this.registrationForm  = new FormGroup({
      firstname: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/i)]),
      lastname: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z ]+$/i)]),
      username: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9 ]+$/i)]),
      email: new FormControl('',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i)]),
      contactnumber: new FormControl('',[Validators.required,Validators.pattern(/^[6-9][0-9]{9}$/i)]),
      gender: new FormControl('',[Validators.required]),
      dateofbirth: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
      profileImage: new FormControl('')
  });

  this.userService.getAllUsernames().subscribe(
    data=>this.Usernames=data
  );

  this.userService.getAllEmails().subscribe(
    data=>this.Emails=data
  );

  }

  registrationSuccess=false;

  previewFile() {

    const file = (document.querySelector('input[type=file]') as HTMLInputElement).files[0];
    const reader = new FileReader();
  
    this.changeFile(file).then((base64: string): any => {
      this.registrationForm.value.profileImage = base64;
      this.imageBase64=base64;
    });
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

  //onSubmit Register
  register() {

    this.registrationForm.value.profileImage=this.imageBase64;
    
    if(this.registrationForm.value.password!=this.registrationForm.value.confirmPassword)
    {
      alert("Passwords not matching!");
      return;
    }

    if(this.Usernames?.find(u=>u==this.registrationForm.value.username)){
      alert("Username "+this.registrationForm.value.username+" is already taken!.Please use other username.");
      return;
    }

    if(this.Emails?.find(u=>u==this.registrationForm.value.email)){
      alert("Email "+this.registrationForm.value.email+" is already taken!.Please use other email.");
      return;
    }

    this.userService.Register(this.registrationForm.value).subscribe(res=>{
      if(res==true){
        this.registrationSuccess=true;
        this.registrationForm.reset(); 
      }
      
      alert("Registration successful!");
      this.router.navigateByUrl("");
    });  
    }

}
