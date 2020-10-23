import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-survey-nav',
  templateUrl: './survey-nav.component.html',
  styleUrls: ['./survey-nav.component.css']
})
export class SurveyNavComponent implements OnInit {

  categoryTitle: any;
  surveys: string[];
  category: number = 0;

  constructor(private dataService: DataService) {
    this.surveys = ["Survey ", "Survey "]
  }

  ngOnInit(): void {
    this.dataService.categoryChosen.subscribe(data => {
      this.category = data;
      this.setSurveyTtitle();
    })
  }

  setSurveyTtitle() {
    switch (this.category) {
      case 1: this.categoryTitle = "IPC";
        break;
      case 2: this.categoryTitle = "Asthma";
        break;
    }
  }

}
