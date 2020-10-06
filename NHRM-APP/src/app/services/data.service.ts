import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MeasurementResult } from '../models/measurement-result';
import { Patient } from '../models/patient';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResourceDialog } from '../models/resource-dialog';
import { PatientResource } from '../models/patient-resource';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL = "https://localhost:5001/api";;
  termsAcceptance: BehaviorSubject<boolean>;
  patient: BehaviorSubject<Patient>;
  loading: BehaviorSubject<boolean>;
  patientResources: PatientResource [];

  constructor(private _http: HttpClient, private spinner: NgxSpinnerService) {
    this.termsAcceptance = new BehaviorSubject(null);
    this.loading = new BehaviorSubject(false);

    this.getPatientDetails();
    this.getPatientResource();

    console.log(this.patient)
  }

  postMeasurementResult(measurementResult: MeasurementResult) {
    this.loading.next(true);
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

  getPatientResource() {

    let resources: PatientResource[] = [{
      heading: "Heading",
      type: "Phone",
      prompt: "0405-555-665",
    },
    {
      heading: "Heading",
      type: "Dialog",
      prompt: "Click Here",
      pdfFileName: "myfile.pdf",
      hyperlink: "www.mylink.com",
      dialog: {
        heading: "Dialog Heading",
        content: "Here is some content",
        video: "www.myvideo.com"
      }
    }];

    this.patientResources = resources;
  }

}