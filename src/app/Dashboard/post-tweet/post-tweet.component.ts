import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetService } from 'src/app/Service/Tweet-Service/tweet.service';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {

  constructor(private tweetService:TweetService,private router:Router) { }

  tweetForm:FormGroup;

  ngOnInit(): void {

    this.tweetForm  = new FormGroup({
      username: new FormControl(''),
      tweetMessage: new FormControl('',[Validators.required,Validators.maxLength(140)]),
      tweetTags: new FormControl('',[Validators.maxLength(50)]),
      tweetTime: new FormControl(''),
      replies:new FormControl('')
  });
  }

  postTweet(){
    this.tweetForm.value.username=sessionStorage.getItem("username");
    this.tweetForm.value.tweetTime=new Date();
    this.tweetForm.value.replies=[];
    this.tweetService.PostTweet(this.tweetForm.value).subscribe(res=>{
      if(res==true){
        alert("Tweet Posted");
        this.tweetForm.reset();
      }
  });
  }
}
