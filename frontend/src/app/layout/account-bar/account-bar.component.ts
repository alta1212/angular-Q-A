import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/share/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { PusherService } from 'src/app/share/pusher/pusher.service';
declare var cuteToast: any;

@Component({
  selector: 'app-account-bar',
  templateUrl: './account-bar.component.html',
  styleUrls: ['./account-bar.component.css']
})
export class AccountBarComponent implements OnInit {
  user_name :any;
  constructor(private cookieService:CookieService,public service: UserService,private pusherService: PusherService) { }
  log:boolean;
  ngOnInit(): void {

    this.pusherService.channel.bind(String(JSON.parse(this.cookieService.get('user')).useR_ID), data => {
      console.log(data.message.answer_author_name);
      cuteToast({
        type: "info",
        message: data.message.answer_author_name + " Reply on your question ",
        timer: 5000
      });
    });
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
