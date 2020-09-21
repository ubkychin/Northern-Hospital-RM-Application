import { Component } from '@angular/core';
import {DataService} from './services/data.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NHRM-APP';

  authorised: boolean;
  isRoot: boolean;

  constructor(private dataService: DataService, private router: Router, private location: Location){
    this.dataService.termsAcceptance.subscribe( data => {
      this.authorised = /* data; */true;
    })

    this.router.events.subscribe(event => {
      if(this.location.path() !== '/home')
        this.isRoot = false;
      else
        this.isRoot = true;
    })
  }

  goBack(){
    this.location.back();
  }
}
