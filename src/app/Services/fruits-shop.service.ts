import { Injectable } from '@angular/core';
import { CartItemModel } from '../Models/cart-item-model';
import { Observable, Observer, Subject } from 'rxjs';
import { SingleServiceResponce } from '../Models/single-service-responce';
import { ServiceResponce } from '../Models/service-responce';
import { Products } from '../Models/products';
import { CategoryNameModel } from '../Models/category-name-model';
import { UserMenuModel } from '../Models/user-menu-model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FruitsShopService {
  changeCart = new Subject();
  //ApiUrl="https://192.168.1.35/api/OnlineShop/";
   ApiUrl="https://192.168.1.36/";
 //https://192.168.1.33/
   constructor(private HttpClient:HttpClient,private router: Router,) { }
   GetAllProducts():Observable<ServiceResponce<Products>>{
     return this.HttpClient.get<ServiceResponce<Products>>(this.ApiUrl+"GetAllProduct");
    
     
   }
   GetRoleBaseMenu(role:string):Observable<ServiceResponce<UserMenuModel>>{
     return this.HttpClient.get<ServiceResponce<UserMenuModel>>(this.ApiUrl+'GetMenuByRole/'+role)
 
   }
   GetAllCategory():Observable<ServiceResponce<CategoryNameModel>>{
     return this.HttpClient.get<ServiceResponce<CategoryNameModel>>(this.ApiUrl+"GetAllCatagery");
   }
   GetProductById(id:any):Observable<SingleServiceResponce<Products>>{
     
     const api = `http://avi7754-001-site1.itempurl.com/api/OnlineShop/GetProductById/${id}`;
     console.log(api);
     return this.HttpClient.get<SingleServiceResponce<Products>>(api);
   }
   GetCartByUser(userid:string):Observable<ServiceResponce<Products>>{
     return this.HttpClient.get<ServiceResponce<Products>>(this.ApiUrl+`GetAllCardByUsername/${userid}`);
 
   }
   AddtoCart(cartitem:CartItemModel):Observable<SingleServiceResponce<string>>{
     console.log(cartitem)
     return this.HttpClient.post<SingleServiceResponce<string>>(this.ApiUrl+"AddtoCart",cartitem);
   }
   DeleteCart(CartId:string):Observable<SingleServiceResponce<string>>{
    return this.HttpClient.get<SingleServiceResponce<string>>(this.ApiUrl+`DeleteCart/${CartId}`);
   }
 }
 
