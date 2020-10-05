import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  failed: boolean;
  err: string;

  constructor(private router: Router, private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(form) {
    console.log(form.value)
    this.authService.login(form.value).then()
      .catch((err) => {
        this.failed = true;
        this.err = err['status'];
      })
      .finally(() => {
        this.dataService.loading.next(false);
        this.router.navigate(['/home']);
      });
    form.reset();
  }

}
