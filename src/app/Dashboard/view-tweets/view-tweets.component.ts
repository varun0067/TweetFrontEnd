import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweetService } from 'src/app/Service/Tweet-Service/tweet.service';
import { UserService } from 'src/app/Service/User-Service/user.service';
import { ThrowStmt } from '@angular/compiler';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-tweets',
  templateUrl: './view-tweets.component.html',
  styleUrls: ['./view-tweets.component.css']
})
export class ViewTweetsComponent implements OnInit {

  constructor(private tweetService:TweetService,private userService:UserService,private router:Router) { }
  
  users;
  user;
  tweets;
  loaded:boolean=false;
  viewComment : {[key: number] : boolean} ={};
  replyTweet : {[key: number] : boolean} ={};
  replyForm;
  
  ngOnInit(): void {

    this.replyForm  = new FormGroup({
    username: new FormControl(''),
    tweetMessage: new FormControl('',[Validators.required]),
    tweetTags: new FormControl(''),
    tweetTime: new FormControl('')
    });

    this.tweetService.getAllTweets().subscribe(
      data=>{
        this.tweets=data;
      }
      );

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

  replyTweetClicked(index:number){
    if(this.replyTweet[index]==false||this.replyTweet[index]==undefined){
    this.replyTweet[index] = true;
  }
    else
    this.replyTweet[index] = false;
  }

  PostComments(tweetid,i){

    this.replyForm.value.username=sessionStorage.getItem("username");
    this.replyForm.value.tweetTime=new Date();
    this.tweetService.ReplyTweet(this.replyForm.value,tweetid).subscribe(res=>{
      if(res==true){
        alert("Successfully Replied");
        this.replyForm.reset();
        this.replyTweetClicked(i);
      }
  });
  }

  likeTweet(tweetid){
    console.log(tweetid);
    this.tweetService.LikeTweet(tweetid).subscribe(res=>{
      if(res)
        alert("Tweet Liked");
    })
  }
}
