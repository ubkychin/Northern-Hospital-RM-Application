import { Component, OnInit } from '@angular/core';
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
  activeMeasurements: any[] = [];

  constructor(private dataService: DataService) {
    this.surveys = ["Survey ", "Survey "]
    this.activeMeasurements = [
      { meas: "ecog", active: true },
      { meas: "likert", active: true },
      { meas: "breath", active: true },
      { meas: "pain", active: true },
      { meas: "fluid", active: true },
      { meas: "qol", active: true },
      { meas: "hads", active: true },
      { meas: "ventolin", active: true }
    ];

    this.dataService.submittedMeasurements.subscribe((data) => {
      data.forEach(number => {
        this.activeMeasurements[number - 1].active = false;
      })
    });
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

  checkMeasurement(measurementId) {

    let patientCategory = JSON.parse(sessionStorage.getItem('Patient')).patientCategories
      .find(catId => catId.categoryId == this.category);

    return patientCategory.measurementIds.find(measId => measId == measurementId);
  }

}
