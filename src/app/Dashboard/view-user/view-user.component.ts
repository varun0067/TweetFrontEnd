import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/User-Service/user.service';
import { TweetService } from 'src/app/Service/Tweet-Service/tweet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService,private tweetService:TweetService) { }
  user;
  users;
  username;
  tweets;
  loaded:boolean=false;
  viewComment : {[key: number] : boolean} ={};
  replyForm;

  ngOnInit(): void {

    this.username=this.activatedRoute.snapshot.paramMap.get("username");

    this.tweetService.getMyTweets(this.username).subscribe(
      data=>{
        this.tweets=data;
      }
      );

      this.userService.getUser(this.username).subscribe(u=>{
        this.user=u;
        if(this.user.profileImage=='')
          this.user.profileImage="../../../assets/images/ProfileImage.jpg";
      })
      this.userService.getAllUsers().subscribe(data=>{
        this.users=data;
        this.loaded=true;
        this.assignProfilePicture();
      });
  }
  assignProfilePicture(){
    for(let i=0;i<this.tweets.length;i++)
    {
      var user=this.users.find(u=>u.username==this.tweets[i].username);
      if(user.profileImage=="")
        this.tweets[i].profileImage="../../../assets/images/ProfileImage.jpg";
      else
        this.tweets[i].profileImage=user.profileImage; 
        
      for(let j=0;j<this.tweets[i].replies.length;j++){
        var user=this.users.find(u=>u.username==this.tweets[i].replies[j].username);
        if(user.profileImage=="")
          this.tweets[i].replies[j].profileImage="../../../assets/images/ProfileImage.jpg";
        else
          this.tweets[i].replies[j].profileImage=user.profileImage;
      }
    }
  }

  getTimeDiff(dateTime){
    var diff = new Date().getTime() - new Date(dateTime).getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    if(days==0)
    {
      if(hours!=0)
        return hours+"h"
      else(hours==0)
      {
        if(minutes!=0)
          return minutes+"min"
        else
          return seconds+"sec"
      }
    }
    else{
      return days+"days"
    }
  }

  viewCommentClicked(index:number){
    if(this.viewComment[index]==false||this.viewComment[index]==undefined){
    this.viewComment[index] = true;
  }
    else
    this.viewComment[index] = false;
  }

}
