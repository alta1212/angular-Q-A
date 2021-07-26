import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { CanActivate,Router } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private fb:FormBuilder, private http: HttpClient,private jwtSevice:JwtHelperService,private cookieService:CookieService) { }
  //api url
  readonly BaseURI="https://localhost:5001/";
  //end api url

  //user login
  formLOgin=this.fb.group(
    {
      password:["",[Validators.required,Validators.minLength(8)]],
      email:["",[Validators.required,Validators.email]],
      Tfa:[""]
    }
  )
  login()
  {
    var body = {
      USER_EMAIL: this.formLOgin.value.email,
      USER_PASSWORD: this.formLOgin.value.password
    };
    return this.http.post(this.BaseURI+"user/login", body);
  }
  //end user login

  //user signup
  formSignup=this.fb.group(
    {
      username:["",Validators.required],
      password:["",[Validators.required,Validators.minLength(8)]],
      email:["",[Validators.required,Validators.email]]
    }
  )

  register() {
    var body = {
      USER_NAME: this.formSignup.value.username,
      USER_EMAIL: this.formSignup.value.email,
      USER_PASSWORD: this.formSignup.value.password
    };
    return this.http.post(this.BaseURI+"user/signup", body);
  }
  //end user sign up

  //-------------2fa code
    //tạo qr
  getQr()
  {
    var body=
    {
        "USER_EMAIL":JSON.parse(this.cookieService.get('user')).useR_EMAIL,
        "USER_ID":JSON.parse(this.cookieService.get('user')).useR_ID
    }
    console.log(JSON.parse(this.cookieService.get('user')).useR_ID)
    console.log(JSON.parse(this.cookieService.get('user')))
     return this.http.post(this.BaseURI+"user/getQr2fa",body,
     { responseType: 'text' });
  }
  //kiểm tra 2 facode
  checkTwoFaCode(s)
  {
    var body=
    {
        "code":s,
        "UserUniqueKey":JSON.parse(this.cookieService.get('user')).useR_ID
    }

    return this.http.post(this.BaseURI+"user/check2fa",
    body,
    { responseType: 'text' });
  }

  //kiểm tra 2 facode
  enableTwoFaCode(s)
  {
    var body=
    {
        "code":s,
        "UserUniqueKey":JSON.parse(this.cookieService.get('user')).useR_ID
    }

    return this.http.post(this.BaseURI+"user/enable2fa",
    body,
    { responseType: 'text' });
  }

  //kiểm tra 2fa code khi login
  //-------------end 2fa code



  logout()
  {
    this.cookieService.deleteAll();
    window.location.href="/signin";
  }



  checkLogin()
  {   if(!this.cookieService.get('user'))
        return false;
      var token=JSON.parse(this.cookieService.get('user')).token;
      console.log(JSON.parse(this.cookieService.get('user')))
      if(token && !this.jwtSevice.isTokenExpired(token))
      {
       
        return true;
      }
   //   window.location.href = '/signin';
      return false;
  }

  formQuestion=this.fb.group(
    {
      tag:[""],
      Title:["",[Validators.required,Validators.minLength(10)]],
      Category:[""],
      Details:["<p>Write your question here!</p>",[Validators.required]],
      getNotication:[""],
      agree:["",[Validators.requiredTrue]],
      type:[""]
    }
  )
  postQuestion()
  {
    var body=
    {
       'QUESTION_TITLE':this.formQuestion.value.Title,
       'QUESTION_TAG':this.formQuestion.value.tag,
       'QUESTION_CATEGORY':this.formQuestion.value.Category,
       'QUESTION_DETAIL':this.formQuestion.value.Details,
       'getNotication':this.formQuestion.value.getNotication,
       'type':this.formQuestion.value.Title,
    }

    return this.http.post(this.BaseURI+"user/ask",
    body,
    { responseType: 'text' });
  
  }
}
