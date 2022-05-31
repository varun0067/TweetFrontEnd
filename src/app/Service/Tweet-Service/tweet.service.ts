import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, mapTo,tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http:HttpClient,private router:Router) { }

  //get all tweets
  getAllTweets(){
    return this.http.get<any>(environment.TweetAPIURL+'getAllTweets');
  }

  //get tweets by username
  getMyTweets(username){
    return this.http.get<any>(environment.TweetAPIURL+'getMyTweets/'+username);
  }

  //post tweet
  PostTweet(tweet){
    return this.http.post<any>(environment.TweetAPIURL+'addTweet',tweet).pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }

  //reply to a tweet
  ReplyTweet(tweet,tweetid){
    return this.http.post<any>(environment.TweetAPIURL+'replyTweet/'+tweetid,tweet).pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }

  DeleteTweet(tweetId){
    return this.http.delete<any>(environment.TweetAPIURL+'deleteTweet/'+tweetId).pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }

  EditTweet(tweet){
    return this.http.put<any>(environment.TweetAPIURL+'updateTweet',tweet).pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }

  LikeTweet(tweetId){
    return this.http.put<any>(environment.TweetAPIURL+'likeTweet/'+tweetId,'').pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }
}
