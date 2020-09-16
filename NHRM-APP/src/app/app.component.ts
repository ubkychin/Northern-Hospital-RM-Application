import { Component } from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NHRM-APP';

  authorised: boolean;

  constructor(private dataService: DataService){
    this.authorised = true;
/*     this.dataService.termsAcceptance.subscribe( data => {
      this.authorised = data;
    }) */
  }
}
