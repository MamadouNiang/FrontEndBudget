import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  host2:string="http://localhost:8084";
  jwt:any;
  username:any;
  roles:any;

  constructor(private http:HttpClient, private router:Router) { }

  login(data:any){
    return this.http.post(this.host2+"/login",data,{observe:'response'})
  }

  saveToken(jwt:any) {
    localStorage.setItem('token',jwt);
    this.jwt=jwt;
   this.parseJWT();
  }

  parseJWT(){
    let jwtHelper = new JwtHelperService();
    let objJWT =jwtHelper.decodeToken(this.jwt);
    this.username=objJWT.obj;
    this.roles=objJWT.roles;
  }
  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0;
  }

  isUser(){
    return this.roles.indexOf('USER')>=0;
  }

  isAuthenticated(){
    return this.roles;
  }
  loadToken() {
    this.jwt=localStorage.getItem('token');
    this.parseJWT();
  }

  logout() {
    localStorage.removeItem('token');
    this.initParams();
  }
  initParams(){
    this.jwt=undefined;
    this.username=undefined;
    this.roles=undefined;
    this.router.navigateByUrl("/login");
  }
}
