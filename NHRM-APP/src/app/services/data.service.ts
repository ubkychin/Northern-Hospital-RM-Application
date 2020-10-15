import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MeasurementResult } from '../models/measurement-result';
import { Patient } from '../models/patient';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientResource } from '../models/patient-resource';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL = "https://localhost:5001/api";;
  termsAcceptance: BehaviorSubject<boolean>;
  emergancyAgreement: BehaviorSubject<boolean>;
  patient: BehaviorSubject<Patient>;
  loading: BehaviorSubject<boolean>;
  patientResources: PatientResource[];
  pdfResource: string;
  categoryChosen: number;

  constructor(private _http: HttpClient, private spinner: NgxSpinnerService) {
    this.termsAcceptance = new BehaviorSubject(null);
    this.emergancyAgreement = new BehaviorSubject(null);
    this.loading = new BehaviorSubject(false);
    this.termsAcceptance.next(JSON.parse(localStorage.getItem('TermsAccepted')));
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
      title: "Pleural Nurse Clinical Consultant",
      type: "phone",
      prompt: "0428-167-972",
    },
    {
      title: "How to perform a Visual Analogue Score",
      type: "dialog",
      prompt: "Click Here",
      content: {
        heading: "How to perform VAS score",
        content: "Instruction: To help you to best describe how good or bad you feel on a given day, we have drawn a scale from Best on the top of the slider to Worst on the bottom of the slider. Please position the slider at the point that describes how you feel today."
      }
    },
    {
      title: "How to drain your Indwelling Pleural Catheter",
      type: "dialog",
      prompt: "Click Here",
      content: {
        heading: "How to drain your Indwelling Pleural Catheter",
        content: "Please enter the amount of fluid you have drained today in millilitres. Enter the value in the box. <p>Below is a video which details how to perform a fluid drainage of an Indwelling Pleural Catheter.</p>",
        video: "https://player.vimeo.com/video/270685188"
      }
    },
    {
      title: "Northern Health Respiratory Medicine",
      type: "link",
      prompt: "Click Here",
      content: "https://www.nh.org.au/service/respiratory-medicine/"
    },
    {
      title: "How to drain your Indwelling Pleural Catheter",
      type: "dialog",
      prompt: "Click Here",
      content: {
        heading: "How to drain your Indwelling Pleural Catheter",
        content: "Please enter the amount of fluid you have drained today in millilitres. Enter the value in the box. <p>Below is a video which details how to perform a fluid drainage of an Indwelling Pleural Catheter.</p>",
        video: "https://player.vimeo.com/video/270685188"
      }
    },
    {
      title: "Indwelling Pleural Catheter Information Sheet",
      type: "pdf",
      prompt: "Click Here",
      content: 'IPC.pdf'
    },
    {
      title: "Northern Health Respiratory Medicine",
      type: "link",
      prompt: "Click Here",
      content: "https://www.nh.org.au/service/respiratory-medicine/"
    },
    {
      title: "Northern Health Respiratory Medicine",
      type: "link",
      prompt: "Click Here",
      content: "https://www.nh.org.au/service/respiratory-medicine/"
    }];

    this.patientResources = resources;
  }


  getHadsQuestions() {
    let list: any = [
      {
        categoryName: "Anxiety",
        prompt: "I feel tense or 'wound up': ",
        options: ["Most of the time", "A lot of time", "From time to time, occasionally", "Not at all"] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        prompt: "I still enjoy the things I used to enjoy:",
        options: ["Definitely as much", "Not quite so much", "Only a little", "Hardly at all"] // 0, 1, 2, 3
      },
      {
        categoryName: "Anxiety",
        prompt: "I get a sort of frightened feeling as if something awful is about to happen",
        options: ["Very definitely and quite badly ", "Yes, but not too badly ", "A little, but it doesn't worry me", "Not at all"] // 3, 2, 1, 0
      },
      {
        
      }

    
    ];
  }

}