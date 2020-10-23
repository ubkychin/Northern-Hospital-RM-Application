import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { FaLayersTextComponent } from '@fortawesome/angular-fontawesome';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    if(this.authService.loggedIn.getValue())
      return true;
    else
      return false;
  }
  
}