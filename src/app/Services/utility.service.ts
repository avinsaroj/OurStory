import { Injectable } from '@angular/core';
import { FruitsShopService } from './fruits-shop.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CartItemModel } from '../Models/cart-item-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  changeCart = new Subject();
  cartItemModel!:CartItemModel
  constructor(private OnlineShopservice:FruitsShopService,public AuthService:AuthService,private router: Router,){
 
  }
  addCart(cartItemModels:CartItemModel){
    this.OnlineShopservice.AddtoCart(cartItemModels).subscribe(resp=>{
      if(resp.success){
        this.changeCart.next(1);
       
      }
    })

  }
}
