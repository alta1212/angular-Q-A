import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthModule } from './/user-auth/user-auth.module';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './user-auth/login/login.component';
import { LoginModule } from './user-auth/login/login.module';
import { IndexComponent } from './index/index.component';
import { IndexModule } from './index/index.module';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsModule } from './questions/questions.module';
import {JwtModule} from "@auth0/angular-jwt";
import { CookieService } from 'ngx-cookie-service';
import { notificationsComponent } from './notifications/notifications.component';
import { notificationsModule } from './notifications/notifications.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { SettingComponent } from './setting/setting.component';
import { SettingModule } from './setting/setting.module';
import { AskQuestionComponent } from './ask-question/ask-question.component';
import { AskQuestionModule } from './ask-question/ask-question.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { UserService } from './share/user.service';
import { ReactiveFormsModule,FormGroup, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';
import { QuestionsDetailModule } from './questions-detail/questions-detail.module';

export function returnToken()
{
    return JSON.parse(this.cookieService.get('user')).token;
}

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    QuestionsComponent,
    notificationsComponent,
    ProfileComponent,
    SettingComponent,
    AskQuestionComponent,
    ForgotPasswordComponent,
    QuestionsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserAuthModule,
    LayoutModule,
    LoginModule,
    IndexModule,
    QuestionsModule,
    notificationsModule,
    ProfileModule,
    SettingModule,
    AskQuestionModule,
    ForgotPasswordModule,
    HttpClientModule,
    FormsModule,
    QuestionsDetailModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:returnToken,
        
        // allowedDomains
        // disallowedRoutes

      },
      
    }),
   
  ],
  providers: [
    UserService,
    CookieService,
    AppModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
 


 }
