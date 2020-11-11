import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MeasurementGuard implements CanActivate {

  constructor(private router: Router) { 
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let disabledMeasurements = JSON.parse(sessionStorage.getItem('disabledMeasurements'));
      if(disabledMeasurements.find(measurementId => measurementId == route.data.measurementId)){
        this.router.navigate(['/home']);
        return false;
      }
    return true;
  }
}
