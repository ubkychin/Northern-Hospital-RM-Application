import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  failed: boolean;
  err: string;

  constructor(private router: Router, private dataService: DataService, private authService: AuthService, private jwtHelper: JwtHelperService, private location: Location) { }

  ngOnInit(): void {
  }

  login(form) {
    console.log(form.value)
    this.authService.login(form.value).then(() => {
      this.dataService.getPatientDetails(this.jwtHelper.decodeToken().URNumber)
        .then(() => {
          console.log("Patient returned\nURNumber: " + this.dataService.patient.value['urNumber'])
          sessionStorage.setItem('Patient', JSON.stringify(this.dataService.patient.value));
          this.router.navigate(['/home']);
        })
        .catch((err) => console.log(err.error))
        .finally(() => {
          this.dataService.loading.next(false)
        });
    })
      .catch((err) => {
        this.failed = true;
        this.err = err['status'];
      })
      .finally(() => {
        this.dataService.loading.next(false);
      });
    form.reset();
  }

}
