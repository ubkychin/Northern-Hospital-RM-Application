import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import {Patient} from 'src/app/models/patient';
import {DataService} from 'src/app/services/data.service';


@Component({
  selector: 'app-qol-vas',
  templateUrl: './qol-vas.component.html',
  styleUrls: ['./qol-vas.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class QolVasComponent implements OnInit {


  currentHealthScore: Number;
  vasSlider: noUiSlider.Instance;
  isValid: Boolean = true;

  patient: Patient;

  constructor(private dataService: DataService) {
    dataService.patient.subscribe(data => {this.patient = data});
  }

  ngOnInit(): void {
    
    var range_all_sliders = {
      'min': [0],
      '25%': [25],
      '50%': [50],
      '75%': [75],
      'max': [100]
    };

    this.vasSlider = document.querySelector('.vas-slider') as noUiSlider.Instance;

      noUiSlider.create(this.vasSlider, {
        start: 0,
        range: range_all_sliders,
        pips: {
          mode: 'range',
          density: 1
        },
      });

      this.vasSlider.setAttribute('disabled', true);      
  }

 
  updateSlider(score) {

    var submitButton = document.querySelector('.submit-button');

    if(score <= 100 && score >= 0) {
      this.vasSlider.noUiSlider.set(score);

      (<HTMLInputElement> submitButton).disabled = false;
      submitButton.classList.remove("disable-button");
      this.isValid = true;

    } else {
      this.vasSlider.noUiSlider.set(0);

      this.isValid = false;
      (<HTMLInputElement> submitButton).disabled = true;
      submitButton.classList.add("disable-button");
    }
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

    this.dataService.postMeasurementResult(measurementResult).catch((err) => console.log(err + "Quality of Life VAS Scale Error"));
  }
}
