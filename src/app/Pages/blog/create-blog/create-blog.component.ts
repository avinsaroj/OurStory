import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserAccountDto } from 'src/app/Models/user-account-dto';
import { AuthService } from 'src/app/Services/auth.service';
import { LoveStoryService } from 'src/app/Services/love-story.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  Reactivefrom!:FormGroup;
  x='';
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
   
  };
  userRole!: string;
  Userdetails!: UserAccountDto;
  username!: string;
  Role!:string;
  constructor(private _fb:FormBuilder,private LoveStory: LoveStoryService, public AuthService: AuthService, private router: Router, public utilityService: UtilityService) {

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
 
  
      id: [null],
      parentId: [null],
      title:[null,[Validators.required]],
      metaTitle: [null,[Validators.required]],
      slug: [null],
      likeCount: [null],
      dislikeCout: [null],
      
      summary: ['', [Validators.required]],
      published: true,
      createdOn: [null],
      createdBy: [null],
      updatedOn: [null],
      updatedBy: [null],
      publishedAt: [null],
      
      content:[null,[Validators.required]],
      userId: [null]
       });
     //console.log( "Role:",this.Role);
    }

  }

  }
  GetUserDetails() {

    this.AuthService.userDetailFromToken();
  }
  GetUserDetail(username: string) {
    this.AuthService.GetUserDetails(username).subscribe(respose => {
      this.Userdetails = respose.data
     
    })
  }
  imageSrcLogo!: string;
  imageSrc!: string;
onFileChange(event: any) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
    reader.readAsDataURL(file);
    reader.onload = () => {
      
    this.imageSrc=  this.imageSrcLogo = reader.result as string;
     // console.log(this.imageSrcLogo);
      this.Reactivefrom.patchValue({
        fileSource: this.imageSrcLogo
      });
    };
  }
}
  PostButtonClick(){
    if(this.Reactivefrom.valid){
     // console.log(this.Reactivefrom.value);
      let PostModel =Object.assign({},this.Reactivefrom.value);
      PostModel.userId=this.Userdetails.userId;
      PostModel.summary=this.imageSrc;
      PostModel.createdBy=this.Userdetails.firstName +" "+ this.Userdetails.lastName;
    //  console.log(PostModel);
      this.LoveStory.InsertPost(PostModel).subscribe(resp=>{
      //  console.log(resp);
        if(resp.success==true){
          this.router.navigate(['/']);
        }
      });
      
    }
  }


}
