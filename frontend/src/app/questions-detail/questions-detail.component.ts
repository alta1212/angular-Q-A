import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../share/system/system.service';
@Component({
  selector: 'app-questions-detail',
  templateUrl: './questions-detail.component.html',
  styleUrls: ['./questions-detail.component.css']
})
export class QuestionsDetailComponent implements OnInit {
  private routeSub: Subscription;
  questionTitle; 
  questionBody;
  questionTag="";
  constructor(private route: ActivatedRoute,private system:SystemService) { }
  private id ;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id=params['id'];
    });
    this.system.getAllQuestionDetail(this.id).subscribe(
      (res:any) => {
         Object.keys(res).map(key => res[key]);
          console.log(res)
          var tagList=res.questioN_TAG.split(",",);
          tagList.forEach(tag => {
            this.questionTag+='<a href="#" class="tag-link">'+tag+'</a>';
          });
          this.questionBody=res.questioN_DETAIL;
          this.questionTitle=res.questioN_TITLE;
      },
      err=>{
        console.log(err)
      }
    )
  }




}
