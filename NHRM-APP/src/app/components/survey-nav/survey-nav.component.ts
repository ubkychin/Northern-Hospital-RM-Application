import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-survey-nav',
  templateUrl: './survey-nav.component.html',
  styleUrls: ['./survey-nav.component.css']
})
export class SurveyNavComponent implements OnInit {

  surveys: string [];
  category: number = 0;

  constructor(private dataService: DataService) {
    this.surveys = ["Survey ", "Survey "] 
    this.category = this.dataService.categoryChosen;
   }

  ngOnInit(): void {
    
  }

}
