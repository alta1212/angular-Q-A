import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { ActivatedRoute } from '@angular/router';
import { SystemService } from '../share/system/system.service';
import { UserService } from '../share/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import {Title} from "@angular/platform-browser";
import $ from "jquery";
import { AngularDayjsService } from 'angular-dayjs';
declare var cuteToast: any;
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
  authorName;
  reply:any=[];
  log:boolean;
  mes;
  authorImage="";
  //user
  UserName;
  UserImage;
  constructor(private titleService:Title,public angularDayjsService: AngularDayjsService,private cookieService:CookieService,private route: ActivatedRoute,public system:SystemService,public service:UserService) {
   
  }
  private slug ;
  private id;
  ckConfig=this.system.ckConfig;
  public Editor = this.system.Editor;
 
  ngOnInit(): void {
    this.log= this.service.checkLogin();
    this.mes="You need <a href='/signin'>log in</a> to answer here"
    if(this.log)
    {
      this.mes="Your Answer";
      this.UserName=JSON.parse(this.cookieService.get('user')).useR_Name;
      this.UserImage=JSON.parse(this.cookieService.get('user')).useR_IMAGE;
    }
  
    this.routeSub = this.route.params.subscribe(params => {
      this.slug=params['id'];
      this.shareLink=location.href.replace(location.hash,"")
    });
    
    this.system.getAllQuestionDetail(this.slug).subscribe(
      (res:any) => {
        console.log(res)
        if(res===null)
        {
           
            window.location.href="404"
        }
        else
        {
          this.reply=res.item2;
          this.comment=res.item3;
          this.author=res.item1.author;
          this.authorName=res.item1.author_name
          this.authorImage=res.item1.author_image
           for (let i = 0; i < this.reply.length; i++) {
             const node =this.reply[i];
               node.listComent = [];
            for (let j = 0; j < this.comment.length; j++) {
                 const node_con = this.comment[j];
                 if (node_con.answer_REPLY_ID == node.answer_REPLY_ID) {
                      node.listComent.push(node_con);
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
          this.titleService.setTitle(this.questionTitle);
        }

      },
      err=>{
        cuteToast({
          type: "error",
          message: "Something went wrong,Try refresh the page",
          timer: 5000
        })
        console.log(err)
      }
    )
  }

  postAnswerSubmit()
  {
    //#region s
//     var htmlTemp=`<div  class="prepare answer-wrap d-flex">
//     <div class="votes votes-styled w-auto">
//         <div class="upvotejs">
//             <a class="upvote upvote-on" data-toggle="tooltip" data-placement="right"
//                 title="This question is useful"></a>
//             <span class="count">0</span>
//             <a class="downvote" data-toggle="tooltip" data-placement="right"
//                 title="This question is not useful"></a>
//             <a class="star check star-on" data-toggle="tooltip" data-placement="right"
//                 title="The question owner accepted this answer"></a>
//         </div>
//     </div><!-- end votes -->
//     <div class="answer-body-wrap flex-grow-1">
//         <div  class="answer-body">
//           ${this.service.formReply.value.answer_DETAIL}

//         </div><!-- end answer-body -->
//         <div class="question-post-user-action">
//             <div class="post-menu">
//                 <div class="btn-group">
//                     <button class="btn dropdown-toggle after-none" type="button"
//                         id="shareDropdownMenu" data-toggle="dropdown" aria-haspopup="true"
//                         aria-expanded="false">Share</button>
//                     <div class="dropdown-menu dropdown--menu dropdown--menu-2 mt-2">
//                         <div class="py-3 px-4">
//                             <h4 class="fs-15 pb-2">Share a link to this question</h4>
//                             <form action="#" class="copy-to-clipboard">
//                                 <span class="text-success-message">Link Copied!</span>
//                                 <input type="text"
//                                     class="form-control form--control form-control-sm copy-input"
//                                     value="">
//                                 <div
//                                     class="btn-box pt-2 d-flex align-items-center justify-content-between">
//                                     <a href="#" class="btn-text copy-btn">Copy link</a>
//                                     <ul class="social-icons social-icons-sm">
//                                         <li><a href="#" class="bg-8 text-white shadow-none"
//                                                 title="Share link to this question on Facebook"><i
//                                                     class="la la-facebook"></i></a></li>
//                                         <li><a href="#" class="bg-9 text-white shadow-none"
//                                                 title="Share link to this question on Twitter"><i
//                                                     class="la la-twitter"></i></a></li>
//                                         <li><a href="#" class="bg-dark text-white shadow-none"
//                                                 title="Share link to this question on DEV"><i
//                                                     class="lab la-dev"></i></a></li>
//                                     </ul>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div><!-- btn-group -->
//                 <a href="#" class="btn">Edit</a>
//                 <button class="btn">Follow</button>
//             </div><!-- end post-menu -->
//             <div class="media media-card user-media align-items-center">
//                 <a href="user-profile.html" class="media-img d-block">
//                     <img src="${this.system.BaseURI+this.UserImage}" alt="avatar">
//                 </a>
//                 <div class="media-body d-flex align-items-center justify-content-between">
//                     <div>
//                         <h5 class="pb-1"><a
//                                 href="user-profile.html">${this.authorName}</a></h5>
//                         <div class="stats fs-12 d-flex align-items-center lh-18">
//                             <span class="text-black pr-2">15.5k</span>
//                             <span class="pr-2 d-inline-flex align-items-center"><span
//                                     class="ball gold"></span>3</span>
//                             <span class="pr-2 d-inline-flex align-items-center"><span
//                                     class="ball silver"></span>10</span>
//                             <span class="pr-2 d-inline-flex align-items-center"><span
//                                     class="ball"></span>26</span>
//                         </div>
//                     </div>
//                     <small class="meta d-block text-right">
//                         <span class="text-black d-block lh-18">answered</span>
//                         <span
//                             class="d-block lh-18 fs-12">Now</span>
//                     </small>
//                 </div>
//             </div><!-- end media -->

//         </div><!-- end question-post-user-action -->
//         <div class="comments-wrap">
          
//             <div  class="comment-form">
//                 <div class="comment-link-wrap text-center">
//                     <a class="collapse-btn comment-link" data-toggle="collapse"
//                         href="#addCommentCollapse{{rep.answer_REPLY_ID}}" role="button"
//                         aria-expanded="false"
//                         title="Use comments to ask for more information or suggest improvements. Avoid answering questions in comments.">Add
//                         a comment</a>
//                 </div>
//                 <div class="collapse border-top border-top-gray mt-2 pt-3"
//                     id="addCommentCollapse{{rep.answer_REPLY_ID}}">
//                     <form [formGroup]="service.formComment"
//                         (submit)="postComment(rep.answer_REPLY_ID)" class="row pb-3">
//                         <div class="col-lg-12">
//                             <h4 class="fs-16 pb-2">Leave a Comment</h4>
//                             <div class="divider mb-2"><span></span></div>
//                         </div><!-- end col-lg-12 -->

//                         <div class="col-lg-12">
//                             <div class="input-box">
//                                 <label class="fs-13 text-black lh-20">Message</label>
//                                 <div class="form-group">

//                                     <input class="form-control form--control"
//                                         formControlName="COMMENT_DETAIL">
//                                 </div>
//                             </div>
//                         </div><!-- end col-lg-12 -->
//                         <div class="col-lg-12">
//                             <div
//                                 class="input-box d-flex flex-wrap align-items-center justify-content-between">
//                                 <button
//                                     class="btn theme-btn theme-btn-sm theme-btn-outline theme-btn-outline-gray"
//                                     type="submit">Post Comment</button>
//                             </div>
//                         </div><!-- end col-lg-12 -->
//                     </form>
//                 </div><!-- end collapse -->
//             </div>


//         </div><!-- end comments-wrap -->

//     </div><!-- end answer-body-wrap -->
// </div>`
    
//     $("#replyQ").append(htmlTemp)
//#endregion s
  
    this.service.formReply.value.token=JSON.parse(this.cookieService.get('user')).token
    this.service.formReply.value.answer_QUESTION_ID=this.id;
    this.service.formReply.value.author_QUESTION_ID=this.author
    this.service.postAnswer().subscribe(
      (res:any) => {
      location.reload();
       console.log(res)
      },
      err=>{
        cuteToast({
          type: "error",
          message: "Something went wrong,Try refresh the page",
          timer: 5000
        })
        console.log(err)
      }
    )
  
  }
  postComment(a)
  {
    this.service.formComment.value.answer_REPLY_ID=a;
    this.service.formComment.value.QUESTION_ID=this.id;
    this.service.formComment.value.token=JSON.parse(this.cookieService.get('user')).token
    this.service.formComment.value.author_QUESTION_ID=this.author
    this.service.postComment(a).subscribe(
      (res:any) => {
        location.reload();
        console.log(res)
      },
      err=>{
        cuteToast({
          type: "error",
          message: "Something went wrong,Try refresh the page",
          timer: 5000
        })
        console.log(err)
      }
    )
  }

}
