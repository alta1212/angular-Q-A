import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { UserService } from 'src/app/share/user/user.service';
declare var cuteAlert: any;
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  checkboxValue: any;
  constructor(private titleService:Title,public service: UserService) {
    this.titleService.setTitle("Seting");
 
  }
  ngOnInit(): void {
  }
  //#region 2fa
  //-------------------------------start 2fa-----------------------------------------------
  showFa=false;
  imgSrc=""; 
  twofaopen()
  { 
    this.showFa=true;
    this.imgSrc="../../../assets/images/loading.gif"; 
    this.service.getQr().subscribe(
      (res:string) => {
        this.imgSrc=res; 
      },
      err => {
        console.log(err);
      }
    );
   
    
  }


  closeTwoFaForm()
  {
    this.showFa=false;
  }

  verity2faCode(code)
  {
    this.service.enableTwoFaCode(code).subscribe(
      (res) => {
       console.log(res)
        if(res=="true")
        {
          cuteAlert({
            type: "success",
            title: "success",
            message: "2Fa enabled successfully",
            buttonText: "Okay"
          })
        }
        
      },
      err => {
        console.log(err);
      }
    );
  }
  //-------------------------------------------end 2fa
  //#endregion 2fa

  
}
