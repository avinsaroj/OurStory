import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SingleServiceResponce } from '../Models/single-service-responce';
import { Observable } from 'rxjs';
import { UserAccountDto } from '../Models/user-account-dto';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://localhost:7289/
  //https://192.168.1.33
  APiUrl: string = 'https://192.168.1.35/api/Auth/';
  name: string = "";
  surname: string = "";
  userName: string = "";
  role = "user";
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId!: number;
  email!: string;
  constructor(private HttpClient: HttpClient, private router: Router,
    private jwtHelper: JwtHelperService,) { }
  Login(loginModule: any): Observable<SingleServiceResponce<string>> {
    return this.HttpClient.post<SingleServiceResponce<string>>(this.APiUrl + 'Login', loginModule);

  }
  LogOut() {
    localStorage.clear();
    return this.GetRole();
  }
  userDetailFromToken() {
    this.token = localStorage.getItem("AuthToken");
    if (this.token != null) {

      this.isLoggedIn = true;
      let decodedToken = this.jwtHelper.decodeToken(this.token);
      this.name = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

      this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      //console.log(this.name, this.roles, this.role, this.userId, this.email, this.userName);
    }

  }
  GetRole(): string {
    this.token = localStorage.getItem("AuthToken");
    if (this.token != null) {

      this.isLoggedIn = true;
      let decodedToken = this.jwtHelper.decodeToken(this.token);


      this.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];


    }
    else {
      this.role = '';
    }
    return this.role;
  }
  isAuthenticated() {

    if (localStorage.getItem("AuthToken")) {

      return true;
    }
    else {
      return false
    }
  }
  GetUserDetails(username: string): Observable<SingleServiceResponce<UserAccountDto>> {
    let api = `https://192.168.1.35/api/UserAccount/GetUserDetails/${username}`;
    return this.HttpClient.get<SingleServiceResponce<UserAccountDto>>(api);

  }
  SignUp(model:any):Observable<SingleServiceResponce<number>>{
    return this.HttpClient.post<SingleServiceResponce<number>>(this.APiUrl+'Register',model);
  }
}
