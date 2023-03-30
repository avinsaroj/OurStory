import { DatePipe } from '@angular/common';
import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import {NgxImageCompressService} from 'ngx-image-compress';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent  implements OnInit{
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
  enableAboutU=false;
  enableAboutF=false;
  enableOurStory=true;
  enableOurFamily=true;
  imgResultAfterCompression: string = '';
 
  example = { first: "", last: "" };
  constructor(private imageCompress: NgxImageCompressService,builder: FormBuilder,private LoveStory: LoveStoryService, public AuthService: AuthService, private router: Router, public utilityService: UtilityService) {
  
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
           console.log(this.aboutU);
          }

        });
        this.LoveStory.GetAllPostByUserId(respose.data.userId).subscribe(resp => {
          if (resp.success == true) {
            this.postModel = resp.data;
           // console.log(resp.data);
           
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
                   // console.log(resp)
                    this.ourFamily=resp.data;
                 // console.log(this.ourFamily)
                   
                  }
                  
                        });
                this.LoveStory.GetGallery(respose.data.userId).subscribe(resp=>{
        
                  if(resp.success==true){
                    this.OurGallery=resp.data;
                  // console.log(this.OurGallery)
                   
                  }
                  
                        });
                this.LoveStory.getAboutUF(respose.data.userId).subscribe(resp => {
                  if (resp.success == true) {
                    this.aboutUF = resp.data;
                    this.dstaLoad = true;
                   // console.log(this.AboutUF)
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
           // console.log('data:image/jpeg;base64,'+btoa(binaryString));
    }
    onClickAboutU(){
      this.aboutU.enable=!this.aboutU.enable;
    }
    onClickAboutF(){
      this.aboutUF.enable=!this.aboutUF.enable;
    }
    OnclickOurStory(item:OurStoryModel){
 
      let indexValue = this.ourStorymodel.indexOf(item);
      // changing specific element in array
       this.ourStorymodel[indexValue].enable =  !item.enable;
      // console.log(item.enable)
 
    }
    OnclickOurStorySave(item:OurStoryModel){
    
        this.LoveStory.InsertOurStory(item).subscribe(resp=>{

          if(resp.success){
           // console.log(resp.success)
            this.LoveStory.GetOurStory(this.Userdetails.userId).subscribe(resp=>{
        
              if(resp.success==true){
                this.ourStorymodel=resp.data;
               // console.log(this.ourStorymodel);
               
               //  console.log(this.ourStorymodel.find(c=>c.id==item.id));
               
              }
              
                    });
          
          }
        })
      
     
       
 
    }
    OnclickOurFamily(item:OurFamilyModel){
      
        let indexValue = this.ourFamily.indexOf(item);
        // changing specific element in array
         this.ourFamily[indexValue].enable =  !item.enable;
        
      
     
 
    }
    OnclickOurNavBar(item:NavBarModel){
      
      let indexValue = this.navBarModer.indexOf(item);
      // changing specific element in array
       this.navBarModer[indexValue].enable =  !item.enable;
      
    
   

  }
    OnclickOurFamilysave(item:OurFamilyModel){
      
    
         this.LoveStory.InsertFamily(item).subscribe(resp=>{

        if(resp.success){
          let indexValue = this.ourFamily.indexOf(item);
      // changing specific element in array
       this.ourFamily[indexValue].enable =  !item.enable;
        }
         })
        
      
      
    
 
    }
    OnclickOurNavbarsave(item:NavBarModel){
      
    
      this.LoveStory.InsertNavbar(item).subscribe(resp=>{

     if(resp.success){
       let indexValue = this.navBarModer.indexOf(item);
   // changing specific element in array
    this.navBarModer[indexValue].enable =  !item.enable;
     }
      })
     
   
   
 

 }
    OnclickAboutUFsave(){
      
    
      this.LoveStory.InsertAboutUF(this.aboutUF).subscribe(resp=>{

     if(resp.success){
     this.aboutUF.enable=false;
     }
      })
     
   
   
 

 }
 OnclickAboutUsave(){
      
    
  this.LoveStory.InsertAboutU(this.aboutU).subscribe(resp=>{

 if(resp.success){
this.aboutU.enable=false;
 }
  })
 




}
    compressFileUF() {
      this.imageCompress.uploadFile().then(({image, orientation}) => {
        
          console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 40, 40) // 50% ratio, 50% quality
              .then(compressedImage => {
                if(compressedImage!=null){
                  this.aboutUF.imageName= this.imgResultAfterCompression = compressedImage;
                 
                }
               
                  
              });
      });
    }
    compressFileU() {
      this.imageCompress.uploadFile().then(({image, orientation}) => {
        
          console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 40, 40) // 50% ratio, 50% quality
              .then(compressedImage => {
                if(compressedImage!=null){
                  this.aboutU.imageName= this.imgResultAfterCompression = compressedImage;
                 
                }
               
                  
              });
      });
    }

    compressFileFamily(item:OurFamilyModel) {
      this.imageCompress.uploadFile().then(({image, orientation}) => {
        
          console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 40, 40) // 50% ratio, 50% quality
              .then(compressedImage => {
                if(compressedImage!=null){
                  let indexValue = this.ourFamily.indexOf(item);
                  // changing specific element in array
                   this.ourFamily[indexValue].imageName   = compressedImage;;
                  
                 
                }
               
                  
              });
      });
    }
    compressFileNav(item:NavBarModel) {
      this.imageCompress.uploadFile().then(({image, orientation}) => {
        
          console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 40, 40) // 50% ratio, 50% quality
              .then(compressedImage => {
                if(compressedImage!=null){
                  let indexValue = this.navBarModer.indexOf(item);
                  // changing specific element in array
                   this.navBarModer[indexValue].imageName   = compressedImage;;
                  
                 
                }
               
                  
              });
      });
    }

}
