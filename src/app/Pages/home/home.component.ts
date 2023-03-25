import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AboutUsRequest } from 'src/app/Models/about-us-requerst';
import { GalleryModel } from 'src/app/Models/gallery-model';
import { LogoModel } from 'src/app/Models/logo-model';
import { NavBarModel } from 'src/app/Models/nav-bar-model';
import { OurFamilyModel } from 'src/app/Models/our-family-model';
import { OurStoryModel } from 'src/app/Models/our-story-model';
import { PostModel } from 'src/app/Models/post-model';
import { UserAccountDto } from 'src/app/Models/user-account-dto';
import { AuthService } from 'src/app/Services/auth.service';
import { LoveStoryService } from 'src/app/Services/love-story.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userRole: string='';
  Userdetails: UserAccountDto={} as UserAccountDto;
  username: string='';
  Role: string='';
  aboutU: AboutUsRequest= {} as AboutUsRequest;
  aboutUF: AboutUsRequest= {} as AboutUsRequest;
  postModel:PostModel[]=[];
  dstaLoad = false;
  ourStorymodel: OurStoryModel[] = [];
  OurGallery:GalleryModel[]=[];
  ourFamily:OurFamilyModel[]=[];
  logo:LogoModel= {} as LogoModel;
  navBarModer:NavBarModel[]=[];
  constructor(private LoveStory: LoveStoryService, public AuthService: AuthService, private router: Router, public utilityService: UtilityService) {

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
        this.Role = this.AuthService.role;


        //console.log( "Role:",this.Role);
      }

    }
    this.dstaLoad = true;
  }
  GetUserDetails() {

    this.AuthService.userDetailFromToken();
  }
  GetUserDetail(username: string) {
    this.AuthService.GetUserDetails(username).subscribe(respose => {
      this.Userdetails = respose.data
      if (respose.success == true) {
        this.LoveStory.getAboutU(respose.data.userId).subscribe(resp => {
          if (resp.success == true) {
            this.aboutU = resp.data;
           
          }

        });
        this.LoveStory.GetAllPostByUserId(respose.data.userId).subscribe(resp => {
          if (resp.success == true) {
            this.postModel = resp.data;
            console.log(resp.data);
           
          }

        });
        this.LoveStory.GetNavBar(respose.data.userId).subscribe(resp => {
          if (resp.success == true) {
            this.navBarModer = resp.data;
           
           
          }

        });
        this.LoveStory.GetOurStory(respose.data.userId).subscribe(resp=>{
        
          if(resp.success==true){
            this.ourStorymodel=resp.data;
          
           
          }
          
                });
               
                this.LoveStory.GetOurFamily(respose.data.userId).subscribe(resp=>{
        
                  if(resp.success==true){
                    console.log(resp)
                    this.ourFamily=resp.data;
                  
                   
                  }
                  
                        });
                this.LoveStory.GetGallery(respose.data.userId).subscribe(resp=>{
        
                  if(resp.success==true){
                    this.OurGallery=resp.data;
                   
                   
                  }
                  
                        });
                this.LoveStory.getAboutUF(respose.data.userId).subscribe(resp => {
                  if (resp.success == true) {
                    this.aboutUF = resp.data;
                  
        
                  }
        
                })
      }
      

    })
  }
   base64textString:String="";
  
  handleFileSelect(evt:any){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt:any) {
     var binaryString = readerEvt.target.result;
            this.base64textString= 'data:image/jpeg;base64,'+btoa(binaryString);
            console.log('data:image/jpeg;base64,'+btoa(binaryString));
    }

}
