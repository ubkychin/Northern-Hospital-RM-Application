import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MeasurementResult } from '../models/measurement-result';
import { Patient } from '../models/patient';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL = "https://localhost:5001/api";;
  termsAcceptance: BehaviorSubject<boolean>;
  logedIn: BehaviorSubject<boolean>;
  patient: BehaviorSubject<Patient>;
  loading: BehaviorSubject<boolean>;

  constructor(private _http: HttpClient, private spinner: NgxSpinnerService) {
    this.termsAcceptance = new BehaviorSubject(null);
    this.logedIn = new BehaviorSubject(null);
    this.loading = new BehaviorSubject(false);

    this.getPatientDetails();

    console.log(this.patient)
  }

  postMeasurementResult(measurementResult: MeasurementResult) {
    this.spinner.show();
    return new Promise((resolve, reject) => {
      this._http.post(this.apiURL + "/MeasurementResults",
        measurementResult).subscribe(
          res => {
            console.log("MR Resolved")
            resolve(res);
          },
          err => {
            console.error("MR Error")
            reject(err);
          });
    })
  }

  getPatientDetails() {
    //get details from API async only if authorized    
    let patient: Patient = {
      'hospitalNumber': '123456789',
      'categoryId': 1
    }
    this.patient = new BehaviorSubject(patient)
  }

}