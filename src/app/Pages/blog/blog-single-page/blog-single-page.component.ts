import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommanModelForPost } from 'src/app/Models/comman-model-for-post';
import { LikeDislikeModel } from 'src/app/Models/like-dislike-model';
import { PostModel } from 'src/app/Models/post-model';
import { UserAccountDto } from 'src/app/Models/user-account-dto';
import { AuthService } from 'src/app/Services/auth.service';
import { LoveStoryService } from 'src/app/Services/love-story.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-blog-single-page',
  templateUrl: './blog-single-page.component.html',
  styleUrls: ['./blog-single-page.component.css']
})
export class BlogSinglePageComponent implements OnInit {
  idvalue:any;
  Reactivefrom!:FormGroup;
  Postname!:CommanModelForPost;
  DisplaySpinner=true;
  userRole!: string;
  Userdetails!: UserAccountDto;
  username!: string;
  Role!:string;
  like=false;
  Dislike=false;
  likedislikepost =new LikeDislikeModel;
  AllPost:PostModel[]=[];
  constructor(private _fb:FormBuilder,private LoveStory:LoveStoryService,private AuthService:AuthService,private router: Router,private activateRoute: ActivatedRoute,public Utility:UtilityService){

  }
  ngOnInit(): void {
    if (this.AuthService.isAuthenticated()) {
     
      this.userRole = this.AuthService.role;
     
  
      if (this.userRole != null) {
       // console.log(this.userRole);
        this.GetUserDetails();
       // this.LoadMenu(this.userRole);
        this.username = this.AuthService.name;
        this.GetUserDetail(this.username);
       //this.AuthService.userDetailFromToken();
       this.Role= this.AuthService.role;
       this.Reactivefrom=this._fb.group({
        id:[null],
      content:[null,[Validators.required]],
      published: [null],
      createdOn: [null],
      createdBy:[null],
      updatedOn: [null],
      updatedBy:[null],
      publishedAt: [null],
      userId:[null],
      postId:[null],
   });
       //console.log( "Role:",this.Role);
      }
      this.LoveStory.GetAllPost().subscribe(resp=>{
        this.AllPost=resp.data.slice(0,5);
      })
    }
 
    this.idvalue= this.activateRoute.snapshot.paramMap.get('Id')
    this.LoveStory.GetPostId(this.idvalue).subscribe(resp=>{
      this.Postname=resp;
      console.log(this.Postname)
      if(this.Postname!=null){
       this.like= this.Postname.likeDislikeModels.find(c=>c.userId==this.Userdetails.userId && c.postId==this.idvalue)?.likePost==true?true:false;
      this.Dislike=  this.Postname.likeDislikeModels.find(c=>c.userId==this.Userdetails.userId && c.postId==this.idvalue)?.dislikePost==true?true:false;
      
       this. DisplaySpinner=false;
      }
    });
    
     
  }
  GetUserDetails() {

    this.AuthService.userDetailFromToken();
  }
  GetUserDetail(username: string) {
    this.AuthService.GetUserDetails(username).subscribe(respose => {
      this.Userdetails = respose.data
     
    })
  }
  CommentButtonClick(){
    if(this.Reactivefrom.valid){
      const timme = new Date();
      const now=timme.toISOString();
      let CommentModel =Object.assign({},this.Reactivefrom.value);
      CommentModel.userId=this.Userdetails.userId;
      CommentModel.postId=this.idvalue;
      CommentModel.id=0;
      CommentModel.published=true;
      CommentModel.publishedAt=now;
      CommentModel.updatedOn=now;
      CommentModel.createdOn=now;
      CommentModel.updatedBy=this.Userdetails.firstName +" "+ this.Userdetails.lastName;
      CommentModel.createdBy=this.Userdetails.firstName +" "+ this.Userdetails.lastName;
      console.log(CommentModel);
       this.LoveStory.InsertComment(CommentModel).subscribe(resp=>{
        if(resp.success==true){
        this.LoveStory.GetPostId(this.idvalue).subscribe(resp=>{
          this.Postname=resp;
         
          if(this.Postname!=null){
           this. DisplaySpinner=false;
          }
        });
      }
       })
      
    }
  }
  LikeButtonClick(){
    this.like=!this.like;
    this.Dislike=false;
   
    this.likedislikepost.userId=this.Userdetails?.userId;
    this.likedislikepost.postId=this.idvalue;
    this.likedislikepost.likePost=this.like;
    this.likedislikepost.dislikePost=this.Dislike;
    
    this.LoveStory.InsertLikeDislike(this.likedislikepost).subscribe(resp=>{
      if(resp.success==true){
        this.LoveStory.GetPostId(this.idvalue).subscribe(resp=>{
          this.Postname=resp;
         
          if(this.Postname!=null){
           this. DisplaySpinner=false;
          }
        });
      }
    })
  }
  DisLikeButtonClick(){
    this.Dislike=!this.Dislike;
    this.like=false;
    this.likedislikepost.userId=this.Userdetails?.userId;
    this.likedislikepost.postId=this.idvalue;
    this.likedislikepost.likePost=this.like;
    this.likedislikepost.dislikePost=this.Dislike;
    
    this.LoveStory.InsertLikeDislike(this.likedislikepost).subscribe(resp=>{
      if(resp.success==true){
        this.LoveStory.GetPostId(this.idvalue).subscribe(resp=>{
          this.Postname=resp;
         
          if(this.Postname!=null){
           this. DisplaySpinner=false;
          }
        });
      }
    })
  }

}
