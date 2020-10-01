import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  login(form) {
    console.log(form.value)
    form.reset();
    this.dataService.logedIn.next(true);
    //this.router.navigate(['/home'])
  }

}
