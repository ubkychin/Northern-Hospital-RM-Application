import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  terms: boolean;
  privacy: boolean;
  
  constructor(private dataService: DataService) { 

  }

  ngOnInit(): void {
  }

  submit(){
    if(this.terms && this.privacy){
      this.dataService.termsAcceptance.next(true);
    }
      
  }
}
