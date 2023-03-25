import { Component, OnInit } from '@angular/core';
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
    this.LoveStory.GetAllPost().subscribe(resp=>{
      this.AllPost=resp.data;
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


}
