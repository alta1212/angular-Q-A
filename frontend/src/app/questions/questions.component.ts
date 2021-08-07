import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { SystemService } from '../share/system/system.service';
import { AngularDayjsService } from 'angular-dayjs';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {
  listQuestion=[];
  totalListQuestionLength;
  ListQuestionpage ;
  questionTag;

  constructor(private titleService:Title,private system:SystemService,public angularDayjsService: AngularDayjsService) {
    this.titleService.setTitle("Questions");
  }
  ngOnInit(): void {
    this.system.GetAllQuestion().subscribe(
      (res:any) => {
          this.listQuestion=res;
          this.totalListQuestionLength=res.length;
          console.log(res)
         
      },
      err=>{
        console.log(err)
      }
    )
  }

}
