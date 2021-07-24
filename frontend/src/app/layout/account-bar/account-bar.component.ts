import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/share/user.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.css']
})
export class AccountBarComponent implements OnInit {
  user_name :any;
  constructor(private cookieService:CookieService,public service: UserService) { }
  log:boolean;
  ngOnInit(): void {
    this.log= this.service.checkLogin();
    if(this.log)
    {
      this.user_name=JSON.parse(this.cookieService.get('user')).useR_NAME;
      
    }
  }
  logout()
  {
    this.service.logout();
  }

 
}
