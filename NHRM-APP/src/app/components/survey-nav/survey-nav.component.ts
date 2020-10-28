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
      { meas: "Ecog", active: true },
      { meas: "Likert", active: true },
      { meas: "Breath", active: true },
      { meas: "Pain", active: true },
      { meas: "Fluid", active: true },
      { meas: "Qol", active: true },
      { meas: "Hads", active: true },
      { meas: "Ventolin", active: true }
    ];
    this.activeMeasurements[0].active = false;
    this.activeMeasurements[5].active = false;
  }

  ngOnInit(): void {
    console.log("something")
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
