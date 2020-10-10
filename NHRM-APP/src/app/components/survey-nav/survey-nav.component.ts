import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-nav',
  templateUrl: './survey-nav.component.html',
  styleUrls: ['./survey-nav.component.css']
})
export class SurveyNavComponent implements OnInit {

  surveys: string [];

  constructor() {
    this.surveys = ["Survey ", "Survey "] 
   }

  ngOnInit(): void {
    
  }

}
