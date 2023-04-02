import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from 'src/app/Models/post-model';
import { UserAccountDto } from 'src/app/Models/user-account-dto';
import { AuthService } from 'src/app/Services/auth.service';
import { LoveStoryService } from 'src/app/Services/love-story.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  AllPost:PostModel[]=[];
  userRole!: string;
  Userdetails!: UserAccountDto;
  username!: string;
  Role!:string;
  dstaLoad = false;
  @ViewChild('container') containerRef!: ElementRef;
  @ViewChild('loader') loaderRef!: ElementRef;
  pageNumber = 1;
  threshold = 100;
  dataFount=true;
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
       this.Role= this.AuthService.role;
       //console.log( "Role:",this.Role);
      }
  
    }
    // this.LoveStory.GetAllPost().subscribe(resp=>{
    //   this.AllPost=resp.data;
    //   this.dstaLoad =true;
    // })
    this.LoveStory.GetPostByPage(this.pageNumber,6).subscribe(resp=>{
      if(resp.success){
        this.AllPost=resp.data;
        this.pageNumber+=1;
        this.dstaLoad =true;
        console.log(resp)
      }
    
    })
  }
  GetUserDetails() {

    this.AuthService.userDetailFromToken();
  }
  GetUserDetail(username: string) {
    this.AuthService.GetUserDetails(username).subscribe(respose => {
      this.Userdetails = respose.data
     
    })
  }

//   onScroll() {
   
//     const container = this.containerRef.nativeElement;
//     const loader = this.loaderRef.nativeElement;
//     const { scrollTop, scrollHeight, clientHeight } = container;
// console.log(scrollTop, scrollHeight, clientHeight, (scrollHeight - (scrollTop + clientHeight) ));
//     if (scrollTop ===  scrollHeight-clientHeight) {
//       loader.style.display = 'block';
//  console.log("hi");
//       this.LoveStory.GetPostByPage(this.pageNumber,1).subscribe(resp=>{
//         if(resp.success){
//           const newItems = resp.data;
//           this.AllPost = [...this.AllPost, ...newItems];
//           this.pageNumber++;
//           loader.style.display = 'none';
         
//           console.log(resp)
//         }
      
//       })
//     }
//   }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.target.documentElement;

    if (scrollHeight - (scrollTop + clientHeight) <= this.threshold) {
     
      this.LoveStory.GetPostByPage(this.pageNumber,6).subscribe(resp=>{
        if(resp.success){
          const newItems = resp.data;
          this.AllPost = [...this.AllPost, ...newItems];       
          this.pageNumber+=1;
        
        }
      
      })
    }
  }
}
