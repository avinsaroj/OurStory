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
import { ImageSlider } from 'src/app/Models/image-slider';
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
  AddStory:OurStoryModel={} as OurStoryModel;
  removedStory:OurStoryModel={} as OurStoryModel;
  OurGallery:GalleryModel[]=[];
  addOurGallery:GalleryModel={} as GalleryModel;
  ourFamily:OurFamilyModel[]=[];
  AddFamily:OurFamilyModel={} as OurFamilyModel;
  logo:LogoModel= {} as LogoModel;
  navBarModer:NavBarModel[]=[];
  addGallery:GalleryModel={} as GalleryModel
  enableAboutF=false;
  enableOurStory=true;
  enableOurFamily=true;
  enableOurGallery=true;
  imgResultAfterCompression: string = '';
  imageObject: ImageSlider[]= [];
  addimage: ImageSlider=new ImageSlider();
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
          // console.log(this.aboutU);
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
           //console.log(this.navBarModer);
           
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
                    for (let i = 0; i < this.OurGallery.length; i++) {
                      var element = this.OurGallery[i];
                      
                      this.addimage=new ImageSlider();
                       this.addimage.image=element.imageName;
                       this.addimage.thumbImage=element.imageName;
                       
                      this.imageObject.push(this.addimage);
                    }
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
    AddStoryBtn(){
    this.ourStorymodel.push(this.AddStory);
    }
    AddGallery(){
      this.addOurGallery.enable=true;
      this.OurGallery.push(this.addOurGallery);
    }
    OnClickSavegalley(item:GalleryModel){
      if(item.userId==null){
        item.userId=this.Userdetails.userId;
        item.createdBy=this.Userdetails.userName;
        item.imageName=this.addOurGallery.imageName
      }
      if( item.userId==this.Userdetails.userId!=null && item.imageName!=null){
        this.LoveStory.InsertGallery(item).subscribe(resp=>{
          if(resp.success){
           this.addimage=new ImageSlider();
           this.addimage.image=item.imageName;
           this.addimage.thumbImage=item.imageName;
           
          this.imageObject.push(this.addimage);
          this.enableOurGallery=true;
         
         
          
        }
       })
      }
    
    }
    OnclickOurStorySave(item:OurStoryModel){
      if(item.userId==null){
        item.userId=this.Userdetails.userId;
        item.createdBy=this.Userdetails.userName;
        
      }
        this.LoveStory.InsertOurStory(item).subscribe(resp=>{

        
        })
      
     
       
 
    }
    AddFamilybtn(){
      this.ourFamily.push(this.AddFamily);
    }
    OnclickOurFamily(item:OurFamilyModel){
      
        let indexValue = this.ourFamily.indexOf(item);
        // changing specific element in array
         this.ourFamily[indexValue].enable =  !item.enable;
        
      
     
 
    }
    OnclickOurNavBar(item:NavBarModel){
     // console.log(item);
      let indexValue = this.navBarModer.indexOf(item);
      // changing specific element in array
       this.navBarModer[indexValue].enable =  !item.enable;
      
    
   

  }
    OnclickOurFamilysave(item:OurFamilyModel){
      
    
    if(item.userId==null){
      item.userId=this.Userdetails.userId;
      item.createdBy=this.Userdetails.userName;
      
    }
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
        
         // console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 70, 70) // 50% ratio, 50% quality
              .then(compressedImage => {
                if(compressedImage!=null){
                  this.aboutUF.imageName= this.imgResultAfterCompression = compressedImage;
                 
                 
                }
               
                  
              });
      });
    }
    compressFileGallery() {
      this.imageCompress.uploadFile().then(({image, orientation}) => {
        
          //console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 70, 70) // 50% ratio, 50% quality
              .then(compressedImage => {
                if(compressedImage!=null){
                  this.addOurGallery.imageName= this.imgResultAfterCompression = compressedImage;
                  this.enableOurGallery=false;
                }
               
                  
              });
      });
    }
    compressFileU() {
      this.imageCompress.uploadFile().then(({image, orientation}) => {
        
         // console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 70, 70) // 50% ratio, 50% quality
              .then(compressedImage => {
                if(compressedImage!=null){
                  this.aboutU.imageName= this.imgResultAfterCompression = compressedImage;
                 
                }
               
                  
              });
      });
    }

    compressFileFamily(item:OurFamilyModel) {
      this.imageCompress.uploadFile().then(({image, orientation}) => {
        
         // console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 70, 70) // 50% ratio, 50% quality
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
        
         // console.log('Size in bytes of the uploaded image was:', this.imageCompress.byteCount(image));
    
          this.imageCompress
              .compressFile(image, orientation, 70, 70) // 50% ratio, 50% quality
              .then(compressedImage => {
                if(compressedImage!=null){
                  let indexValue = this.navBarModer.indexOf(item);
                  // changing specific element in array
                   this.navBarModer[indexValue].imageName   = compressedImage;;
                  
                 
                }
               
                  
              });
      });
    }
  DeleteGallery(id:number){
    
    this.LoveStory.DeleteGallery(id.toString()).subscribe(resp=>{
      if(resp.success){
        
          this.OurGallery=this.OurGallery.filter(c=>c.id!=id);
        
      }
      
          })
  }
  DeleteStory(id:number){
    
    this.LoveStory.DeleteOurStory(id.toString()).subscribe(resp=>{
if(resp.success){
  
    this.ourStorymodel=this.ourStorymodel.filter(c=>c.id!=id);
  
}

    })
  }
  DeleteFamily(id:number){
    
    this.LoveStory.DeleteOurFamily(id.toString()).subscribe(resp=>{
      if(resp.success){
        
          this.ourFamily=this.ourFamily.filter(c=>c.id!=id);
        
      }
      
          })
  }
  DeleteAboutU(id:number){
    
    this.LoveStory.DeleteAboutU(id.toString())
  }
  DeleteAboutF(id:number){
    
    this.LoveStory.DeleteAboutUF(id.toString())
  }

}
