import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req,next){
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization: 'Bearer '+sessionStorage.getItem('jwt')
      }
    })
    return next.handle(tokenizedReq)
  }
}
