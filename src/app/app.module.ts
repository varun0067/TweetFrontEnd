import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home/home.component';
import { UserService } from './Service/User-Service/user.service';
import { RegisterComponent } from './home/register/register.component';
import { HomeNavComponent } from './home/home-nav/home-nav.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { UserDashboardComponent } from './Dashboard/user-dashboard/user-dashboard.component';

import { ViewTweetsComponent } from './Dashboard/view-tweets/view-tweets.component';
import { PostTweetComponent } from './Dashboard/post-tweet/post-tweet.component';
import { UserNavComponent } from './Dashboard/user-nav/user-nav.component';
import { ViewUserComponent } from './Dashboard/view-user/view-user.component';
import { TweetService } from './Service/Tweet-Service/tweet.service';
import { InterceptorService } from './HttpInterceptor/interceptor.service';
import { ChangePasswordComponent } from './Dashboard/change-password/change-password.component';
import { ChangeProfilePictureComponent } from './Dashboard/change-profile-picture/change-profile-picture.component';
import { ViewMyTweetsComponent } from './Dashboard/view-my-tweets/view-my-tweets.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    HomeNavComponent,
    ForgotPasswordComponent,
    UserDashboardComponent,
    ViewTweetsComponent,
    PostTweetComponent,
    UserNavComponent,
    ViewUserComponent,
    ChangePasswordComponent,
    ChangeProfilePictureComponent,
    ViewMyTweetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService,TweetService,{
    provide:HTTP_INTERCEPTORS,
    useClass:InterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
