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
      console.log(this.reactivefrom.value);
            let loginModel =Object.assign({},this.reactivefrom.value);
            this.AuthService.SignUp(loginModel).subscribe(resp=>{
              if(resp.success){
                
                this.router.navigate(['Login']);
              }
              console.log(resp)
            });
    }
  }
}
