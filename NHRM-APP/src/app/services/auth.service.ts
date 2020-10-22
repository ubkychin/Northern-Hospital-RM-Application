import { Injectable } from '@angular/core';
import {Login} from '../models/login';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DataService } from './data.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = "https://localhost:5001/api";
  loggedIn: BehaviorSubject<boolean>;

  constructor(private _http: HttpClient, private dataService: DataService, private jwtHelper: JwtHelperService) { 
    this.loggedIn = new BehaviorSubject(null);
    if(this.isLoggedIn())
      this.loggedIn.next(true);
    else
      this.loggedIn.next(false);
  }

  login(credentials: Login){
    this.dataService.loading.next(true);
    return new Promise((resolve, reject) => {
      this._http.post(this.apiURL + "/Auth/patientlogin", credentials).subscribe(
        (token) => {
          console.log("Logged in")
          localStorage.setItem('Authorization', JSON.stringify(token['token']))
          this.loggedIn.next(true);
          resolve();
        },
        err => {
          console.error("Login Error")
          this.loggedIn.next(false);
          reject(err);
        });
    })
  }

  isLoggedIn(){
    return !this.jwtHelper.isTokenExpired();
  }

  logout(){
    localStorage.removeItem('Authorization');
    sessionStorage.removeItem('disclaimer');
    this.loggedIn.next(false);
  }
}
