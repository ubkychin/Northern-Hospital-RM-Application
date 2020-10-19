import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-qol-vas',
  templateUrl: './qol-vas.component.html',
  styleUrls: ['./qol-vas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QolVasComponent implements OnInit {

  isValid: Boolean = true;
  vasScore: number[] = [];
  patient: Patient;
  partA: boolean = true;
  measurementResult: MeasurementResult[] = [];

  constructor(private dataService: DataService, private router: Router) {
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {
  }

  infoDialog() {

  }

  getVasInputScore(event) {
    this.vasScore.push(event);
    console.log("Pain Vas Input = " + this.vasScore[0])
    this.measurementResult.push({
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 4,
      'timeStamp': new Date(),
      'value': this.vasScore[0]
    });
    this.partA = false;
  }

  getVasSliderScore(event) {
    this.vasScore.push(parseInt(event));
    console.log("Pain Vas Slider = " + this.vasScore[1])
    this.measurementResult.push({
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 2,
      'measurementId': 4,
      'timeStamp': new Date(),
      'value': this.vasScore[1]
    });

    this.recordVASHealth();
  }

  recordVASHealth() {
    console.log(this.patient);
    console.log(this.measurementResult);

    this.dataService.postMeasurementResult(this.measurementResult)
      .then(() => {
        console.log("Qol Vas Recorded");
        this.router.navigate(['/survey-nav']);
      })
      .catch((err) => console.log(err + "Qol VAS ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
