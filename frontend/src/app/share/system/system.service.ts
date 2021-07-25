import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { CanActivate,Router } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }
  //api url
  readonly BaseURI="https://localhost:5001/";
  //end api url
  getAllCategory()
  {
    // return this.http.get(this.BaseURI+"user/check2fa",
    // { responseType: 'text' });
    return this.http.get(this.BaseURI+"Category/getAllCategory",{responseType: 'json'});
  }
}
