import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoModel } from 'src/app/Models/logo-model';
import { Products } from 'src/app/Models/products';
import { UserAccountDto } from 'src/app/Models/user-account-dto';
import { UserMenuModel } from 'src/app/Models/user-menu-model';
import { AuthService } from 'src/app/Services/auth.service';
import { FruitsShopService } from 'src/app/Services/fruits-shop.service';
import { LoveStoryService } from 'src/app/Services/love-story.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  Carttogglevalue='';
  hearttogglevalue='';
  Menutogglevalue='';
  Searchtogglevalue='';
  cart='';
  userRole!: string;
  usermenu: UserMenuModel[] = [];
  cartItemModel: Products[] = [];
  Userdetails!: UserAccountDto;
  username!: string;
  cartCount!: number;
  Loadmenus = false;
  cartCountNumber=0;
  totalAmount=0;
  Role!:string;
  logo:LogoModel={} as LogoModel
  constructor(private LoveStory: LoveStoryService, private OnlineShopservice:FruitsShopService,  public AuthService: AuthService, private router: Router, public utilityService: UtilityService) {

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


   
  }
  
  GetUserDetails() {

    this.AuthService.userDetailFromToken();
  }
  GetUserDetail(username: string) {
    this.AuthService.GetUserDetails(username).subscribe(respose => {
      this.Userdetails = respose.data
    
    })
  }
  getRole(): string {
    return this.AuthService.role;
  }
  LoadMenuData() {
    if (this.Loadmenus) {
      return true
    }
    else {
      return false;
    }

  }
  LoadMenu(role: string) {
    this.OnlineShopservice.GetRoleBaseMenu(role).subscribe(respo => {

      this.usermenu = respo.data;
      this.Loadmenus = respo.success;
    })
  }
  isAuthenticated() {
    if (this.AuthService.isAuthenticated()) {
      return true;
    }
    else {
      return false;
    }
  }
  LogOut() {
   
    this.AuthService.LogOut()
   
    this.router.navigate(['Login']);

  }
  GetCartByUsers(username: string) {
   
    this.OnlineShopservice.GetCartByUser(username).subscribe(resp => {
      this.cartItemModel = resp.data;
      if (resp.success) {
        this.cartCount = resp.data.length;
        this.cartCountNumber=resp.data.length;
       
        this.totalAmount=0;
        this.cartItemModel.forEach(element => {
          this.totalAmount+= (element.price-((element.discountDiscountPercent*element.price)/100)) *element.quantity
        });
      }
      
    
    });

  }
  DeleteCartById(Id:string){
    this.OnlineShopservice.DeleteCart(Id).subscribe(resp=>{
      this.GetCartByUsers(this.Userdetails.userId);
    });
  }
  hearttoggalge(){
    this.hearttogglevalue='active';
    
  }
  Searchtoggalge(){
    this.Searchtogglevalue='active';
    
  }
  Carttoggalge(){
    this.Carttogglevalue='active';
    
  }
  Menutoggalge(){
    this.Menutogglevalue='active';
    
  }
  CloseBtn(){
    this.Menutogglevalue='';
    this.Carttogglevalue='';
    this.hearttogglevalue='';
    this.Searchtogglevalue='';
  }
}
