import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vas-slider',
  templateUrl: './vas-slider.component.html',
  styleUrls: ['./vas-slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VasSliderComponent implements OnInit {

  currentHealthScore: Number;
  vasSlider: noUiSlider.Instance;
  isValid: Boolean = true;
  patient: Patient;

  

  @Output() vasValue: EventEmitter<Number> = new EventEmitter<Number>();


  constructor(private dataService: DataService, private router: Router) {
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {

    var range_all_sliders = {
      'min': [0],
      'max': [100]
    };

    this.vasSlider = document.querySelector('.vas-slider');

    noUiSlider.create(this.vasSlider, {
      start: 0,
      range: range_all_sliders,
      pips: {
        mode: 'range',
        density: 100
      },
    });

    this.vasSlider.noUiSlider.on('update.one', (values) => {  

      // console.log(values[0]);
      
      this.currentHealthScore = values[0];

      this.vasValue.emit(this.currentHealthScore);
    });

  }

  

  submitValueUpdated() {
    console.log(this.vasSlider)
  }

  submitData() {
    let measurementResult = {
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 6,
      'measurementId': 6,
      'timeStamp': new Date(),
      'value': Number(this.vasSlider.noUiSlider.get())
    };

    this.dataService.postMeasurementResult(measurementResult)
      .then(() => this.router.navigate(['/survey-nav']))
      .catch((err) => console.log(err + "Quality of Life VAS Scale Error"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}