import { AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {DataService} from 'src/app/services/data.service';
import {Patient} from 'src/app/models/patient';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';


@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.css']
})
export class LikertComponent implements OnInit {

  model: any = {};

  form: FormGroup;

  patient: Patient;

  constructor(fb: FormBuilder, private dataService: DataService) {
    this.form = fb.group({
      feeling: ['', Validators.required]
    });

    dataService.patient.subscribe(data => {this.patient = data});
  }

  ngOnInit(): void {

  }

  onSubmit() {
    let measurementResult = {
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 2,
      'timeStamp': new Date(),
      'value': Number(this.form.value["feeling"])
    };

    this.dataService.postMeasurementResult(measurementResult).catch((err) => console.error(err + " Likert ERR"));
  }
}
