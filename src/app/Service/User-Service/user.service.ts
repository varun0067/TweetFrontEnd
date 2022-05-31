import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { catchError, mapTo,tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }

  //register user
  Register(user){
    console.log(user)
    return this.http.post<any>(environment.UserAPIURL+'register',user)
    .pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }

  //Check Login
  Login(loginDetails)
  {

    return this.http.post<any>(environment.UserAPIURL+'login',loginDetails)
    .pipe(
      tap(token=>this.setLoginUser(token.token,token.username)),
      mapTo(true),
      catchError(error=>{
        return of(false);
      })
    );
  }

  //setting session storage after successful login 
  setLoginUser(token:string,username:string)
  {
    sessionStorage.setItem("jwt",token);
    sessionStorage.setItem("username",username);
  }

  //checking login
  LoggedIn()
  {
    return !!(sessionStorage.getItem("jwt")&&sessionStorage.getItem("username"));
  }

  //logout
  logout()
  {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("username");
    this.router.navigateByUrl("");
  }

  //get all users
  getAllUsers(){
    return this.http.get<any>(environment.UserAPIURL+'getAllUsers');
  }

  //get all usernames
  getAllUsernames(){
    return this.http.get<any>(environment.UserAPIURL+'getAllUsersnames');
  }

  //get all emails
  getAllEmails(){
    return this.http.get<any>(environment.UserAPIURL+'getAllEmails');
  }

  //get users
  getUser(username){
    return this.http.get<any>(environment.UserAPIURL+'getUser/'+username);
  }
  
  //forgot Password
  forgotPassword(forgotPasswordDTO){
    return this.http.post<any>(environment.UserAPIURL+'forgotPassword',forgotPasswordDTO)
    .pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }

  //change password
  changePassword(changePasswordDTO){
    return this.http.post<any>(environment.UserAPIURL+'changePassword',changePasswordDTO)
    .pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }

  //change profile picture
  changePicture(changePictureDTO){
    console.log(changePictureDTO);
    return this.http.post<any>(environment.UserAPIURL+'changePicture',changePictureDTO)
    .pipe(
      mapTo(true),
      catchError(error=>{
        return of(error.error);
      })
    );
  }
  
}
