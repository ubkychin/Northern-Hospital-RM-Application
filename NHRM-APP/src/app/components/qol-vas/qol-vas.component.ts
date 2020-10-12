import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-qol-vas',
  templateUrl: './qol-vas.component.html',
  styleUrls: ['./qol-vas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QolVasComponent implements OnInit {


  currentHealthScore: Number;
  // vasSlider: noUiSlider.Instance;
  isValid: Boolean = true;
  patient: Patient;

  constructor(private dataService: DataService, private router: Router) {
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {
  }

  vasValue(event: Number) {
    console.log("Printing numbers");
  }


  updateSlider(score) {

    var submitButton = document.querySelector('.submit-button');

  }

  submitData() {
    let measurementResult = {
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 6,
      'measurementId': 6,
      'timeStamp': new Date(),
      // 'value': Number(this.vasSlider.noUiSlider.get())
    };

    // this.dataService.postMeasurementResult(measurementResult)
    //   .then(() => this.router.navigate(['/survey-nav']))
    //   .catch((err) => console.log(err + "Quality of Life VAS Scale Error"))
    //   .finally(() => {
    //     console.log("Finalized");
    //     this.dataService.loading.next(false);
    //   });
  }
}
