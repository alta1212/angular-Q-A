import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../share/system/system.service';
import { UserService } from '../share/user/user.service';
import { CookieService } from 'ngx-cookie-service';

import { strings as englishStrings } from 'ngx-timeago/language-strings/en';

import { AngularDayjsService } from 'angular-dayjs';

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
  time;
  shareLink;
  author;
  comment;
  reply:any=[];
 
  constructor(public angularDayjsService: AngularDayjsService,private cookieService:CookieService,private route: ActivatedRoute,private system:SystemService,public service:UserService) { }
  private slug ;
  private id;
  ckConfig=this.system.ckConfig;
  public Editor = this.system.Editor;
 
  ngOnInit(): void {

   

    this.routeSub = this.route.params.subscribe(params => {
      this.slug=params['id'];
      this.shareLink=window.location
    });
    
    this.system.getAllQuestionDetail(this.slug).subscribe(
      (res:any) => {
         Object.keys(res).map(key => res[key]);
          console.log(res)
          this.reply=res.item2;
          this.comment=res.item3;
          this.author=res.item1.author;
         

           for (let i = 0; i < this.reply.length; i++) {
             const node =this.reply[i];
               node.listComent = [];
            for (let j = 0; j < this.comment.length; j++) {
                 const node_con = this.comment[j];
                 if (node_con.answer_REPLY_ID == node.answer_REPLY_ID) {
                      node.listComent.push(node_con);
                    console.log(node)
                 }
            
               
                  
                }
          
           }

          this.id=res.item1.questioN_ID
        
          var tagList=res.item1.questioN_TAG.split(",",);
          tagList.forEach(tag => {
            this.questionTag+='<a href="#" class="tag-link">'+tag+'</a>';
          });
          this.questionBody=res.item1.questioN_DETAIL;
          this.questionTitle=res.item1.questioN_TITLE;
          this.time=res.item1.time;
      },
      err=>{
        console.log(err)
      }
    )
  }

  postAnswerSubmit()
  {
    console.log(this.author)
    this.service.formReply.value.answer_QUESTION_ID=this.id;
    this.service.formReply.value.token=JSON.parse(this.cookieService.get('user')).token
    this.service.formReply.value.author_QUESTION_ID=this.author
    this.service.postAnswer().subscribe(
      (res:any) => {
      
        window.location.reload();
      },
      err=>{
        console.log(err)
      }
    )
  
  }


}
