import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/Models/login-model';
import { SingleServiceResponce } from 'src/app/Models/single-service-responce';
import { AuthService } from 'src/app/Services/auth.service';
import { FruitsShopService } from 'src/app/Services/fruits-shop.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  reactiveform!:FormGroup;
  public LoginModel!:LoginModel;
 
  LoginSuccuess:boolean=false;
  loginResponce!:SingleServiceResponce<string>;
  constructor(private _fb:FormBuilder,private OnlineShopservice:FruitsShopService,private AuthService:AuthService,public Utility:UtilityService,private router: Router){
 
  }
 
  ngOnInit(): void {
   
    this.reactiveform=this._fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(5)]],
      rememberMe:[null,[Validators.requiredTrue]]
    })
  }
  submitForm(){
    //console.log(this.reactiveform.value)
  }
  LoginButtonClick(){
    if(this.reactiveform.valid){

      let loginModel =Object.assign({},this.reactiveform.value);
    
      this.AuthService.Login(loginModel).subscribe(Response=>
        {
         this.loginResponce=Response;
        
          if(Response.success==true){
            localStorage.setItem('AuthToken',Response.data)
            this.AuthService.isLoggedIn=true;
           this.Utility.changeCart.next(2);
        
        
          
            this.router.navigate(['/']);
          }
          else{
            this.LoginSuccuess=true;
          
          }
       
      
       
        
      })
      this.AuthService.userDetailFromToken();
    }
  }
}
 
