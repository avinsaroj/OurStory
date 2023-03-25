import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate,CanLoad {
  constructor(private AuthService:AuthService, private router:Router){
 
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.AuthService.isAuthenticated()){
     
      return false;
     
    }
    else{
        if(this.AuthService.GetRole()=='Administrator'){
          return true;
        }
        else{
          this.router.navigate(["/"])
          return false;
        }
    }
    return true;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    


      if(this.AuthService.isAuthenticated()){
     
        return true;
       
      }
      else{
        this.router.navigate(["Login"])
      
        return false
      }
  }
  
}
