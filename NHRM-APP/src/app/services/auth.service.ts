import { Injectable } from '@angular/core';
import {Login} from '../models/login';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DataService } from './data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = "https://localhost:5001/api";
  /* apiURL = "http://northernhealthapi-env.eba-iawekmm2.us-east-1.elasticbeanstalk.com/api"; */
  loggedIn: BehaviorSubject<boolean>;

  constructor(private _http: HttpClient, private dataService: DataService, private jwtHelper: JwtHelperService, private router: Router) { 
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
    window.location.reload();
    localStorage.removeItem('Authorization');
    sessionStorage.removeItem('disclaimer');
    sessionStorage.removeItem('Patient');
    this.loggedIn.next(false);
    this.dataService.patientResources = null;
  }
}
