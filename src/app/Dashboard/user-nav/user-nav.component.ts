import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/User-Service/user.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  constructor(private userService:UserService) { }
  
  user;
  profileImage;

  ngOnInit(): void {
    this.userService.getUser(sessionStorage.getItem("username")).subscribe(user=>{
      this.user=user;
      if(user.profileImage=='')
      {
        this.profileImage="../../../assets/images/ProfileImage.jpg"
      }
      else{
        this.profileImage=this.user.profileImage;
      }
    })
  }

  logout()
  {
    this.userService.logout();
  }
}
