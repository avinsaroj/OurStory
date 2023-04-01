import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { FruitsShopService } from 'src/app/Services/fruits-shop.service';
import { UtilityService } from 'src/app/Services/utility.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  reactivefrom!:FormGroup;
  LoginSuccuess:boolean=true;
  loginResponce!:string;
  dstaLoad = false;
  constructor(private _fb:FormBuilder,private OnlineShopservice:FruitsShopService,private AuthService:AuthService,public Utility:UtilityService,private router: Router){
 
  }
  ngOnInit(): void {
    this.reactivefrom=this._fb.group({
      userId:[null],
      userName:[null],
      email:[null,[Validators.required,Validators.email]],
      firstName:[null,[Validators.required]],
      lastName:[null,[Validators.required]],
      notes:[null],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],
      userRole:['user'],
      isSuperUser:[false,[Validators.requiredTrue]]
    })
    
  }
  GetPassword(){
    return this.reactivefrom.controls['password'];
  }
  SignButtonClick(){
    if(this.reactivefrom.valid){
      this.dstaLoad = true;
            let loginModel =Object.assign({},this.reactivefrom.value);
            this.AuthService.SignUp(loginModel).subscribe({
              next:(resp)=>{
                if(resp.success){
                  this.dstaLoad = false;
                  this.router.navigate(['Login']);
                }

              },
              error:(err)=>{
                this.dstaLoad = false;
                this.LoginSuccuess=false;
                this.loginResponce='There was an error in retrieving data from the server'
              }
            });
           
    }
  }
  CloseBtnClick(){
    this.LoginSuccuess=true
  }
}
