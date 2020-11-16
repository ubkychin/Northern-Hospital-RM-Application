import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MeasurementGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let disabledMeasurements = JSON.parse(sessionStorage.getItem('disabledMeasurements'));
    if (disabledMeasurements.find(measurementId => measurementId == route.data.measurementId)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
