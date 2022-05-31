import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/User-Service/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private userService:UserService) { }

  user;
  profileImage;
  allUsers;
  filteredUsers;
  searchForm;

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

    this.userService.getAllUsers().subscribe(users=>{
      this.allUsers=users;
      this.filteredUsers=users;
      this.allUsers.forEach(u => {
        if(u.profileImage=='')
        {
          u.profileImage="../../../assets/images/ProfileImage.jpg"
        }
        else{
          u.profileImage=u.profileImage;
        }
      }); 
    })

    this.searchForm  = new FormGroup({
      username: new FormControl('')
      });
  }

  filterUser(){
    this.filteredUsers=this.allUsers;
    this.filteredUsers=this.filteredUsers.filter(u=>{
      return u.username.toLowerCase().includes(this.searchForm.value.username);
    })
  }

}
