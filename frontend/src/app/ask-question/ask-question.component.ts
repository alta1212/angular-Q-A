import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { UserService  } from '../share/user.service';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {

  constructor(private titleService:Title,public service:UserService) {
    this.titleService.setTitle("Questions");
  }

  ngOnInit(): void {
  }
  postQuestionSubmit()
  {
   console.log(this.service.postQuestion()) ;
  }
  tag=[];
  tagPlaceholer="e.g. javascript"
  config= {
    create: true,
    labelField: 'label',
    valueField: 'value',
    maxItems: 10
  }
}
