import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Patient } from 'src/app/models/patient';
import { Router } from '@angular/router';
import { MeasurementResult } from 'src/app/models/measurement-result';


@Component({
  selector: 'app-qol-vas-slider',
  templateUrl: './qol-vas-slider.component.html',
  styleUrls: ['./qol-vas-slider.component.css']
})
export class QolVasSliderComponent implements OnInit {

  currentHealthScore: number;
  patient: Patient;

  constructor(private dataService: DataService, private router: Router) {
    dataService.patient.subscribe(data => { this.patient = data });
   }

  ngOnInit(): void {
  }


  getHealthScore(event) {
    this.currentHealthScore = event;
  }


  submitHealthScore() {
    let measurementResult: MeasurementResult[] = [{
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 6,
      'measurementId': 6,
      'timeStamp': new Date(),
      'value': this.currentHealthScore
    }];


    this.dataService.postMeasurementResult(measurementResult)
    .then(() => this.router.navigate(['/survey-nav']))
    .catch((err) => console.log(err + "Quality of Life VAS Scale Error"))
    .finally(() => {
      console.log("Finalized");
      this.dataService.loading.next(false);
      this.router.navigate(['/survey-nav']);
    });

  }
}
