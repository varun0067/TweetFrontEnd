import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/User-Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})
export class ChangeProfilePictureComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { }

  imageBase64;
  changeProfilePictureForm;
  ngOnInit(): void {
    this.changeProfilePictureForm  = new FormGroup({
      username: new FormControl(''),
      profileImage: new FormControl('',[Validators.required]),
      });
  }


  changePicture(){
      
    this.changeProfilePictureForm.value.profileImage=this.imageBase64;
    this.changeProfilePictureForm.value.username=sessionStorage.getItem("username");

    this.userService.changePicture(this.changeProfilePictureForm.value).subscribe(res=>{
      if(res==true){
        alert("Profile Picture saved");
        this.changeProfilePictureForm.reset(); 
      }
      
      
      this.router.navigateByUrl("user-dashboard");
    });  
    }

    previewFile() {

      const file = (document.querySelector('input[type=file]') as HTMLInputElement).files[0];
      const reader = new FileReader();
    
      this.changeFile(file).then((base64: string): any => {
        this.changeProfilePictureForm.value.profileImage = base64;
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
}
