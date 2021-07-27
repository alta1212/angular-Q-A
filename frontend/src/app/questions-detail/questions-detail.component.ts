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
  constructor(private route: ActivatedRoute,private system:SystemService) { }
  private id ;
  questionBody;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id=params['id'];
    });
    this.system.getAllQuestionDetail(this.id).subscribe(
      (res) => {
         Object.keys(res).map(key => res[key]);
          console.log(res)
          const question = Object["values"](res);
         this.questionBody=question[4]
          ;
      },
      err=>{
        console.log(err)
      }
    )
  }




}
