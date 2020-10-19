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

  postMeasurementResult(measurementResult: MeasurementResult[]) {
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
        prompt: "I feel tense or 'wound up':",
        list: [
          {option: "Most of the time", value: 3}, 
          {option: "A lot of time", value: 2}, 
          {option: "From time to time, occasionally", value: 1}, 
          {option: "Not at all", value: 0}
        ] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        prompt: "I still enjoy the things I used to enjoy:",
        list: [
          {option: "Definitely as much", value: 0}, 
          {option: "Not quite so much", value: 1}, 
          {option: "Only a little", value: 2}, 
          {option:"Hardly at all", value: 3}
        ] // 0, 1, 2, 3
      },
      {
        categoryName: "Anxiety",
        prompt: "I get a sort of frightened feeling as if something awful is about to happen:",
        list: [
          {option: "Very definitely and quite badly", value: 3}, 
          {option: "Yes, but not too badly", value: 2}, 
          {option: "A little, but it doesn't worry me", value: 1},
          {option: "Not at all", value: 0}
        ] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        prompt: "I can laugh and see the funny side of things:",
        list: [
          {option: "As much as I always could", value: 0}, 
          {option: "Not quite so much now", value: 1}, 
          {option: "Definitely not so much now", value: 2},
          {option: "Not at all", value: 3}
        ] // 0 1 2 3
      },
      {
        categoryName: "Anxiety",
        prompt: "Worrying thoughts go through my mind:",
        list: [ 
          {option: "A great deal of the time", value: 3}, 
          {option: "A lot of the time", value: 2},
          {option: "From time to time, but not too often", value: 1},
          {option: "Only occasionally", value: 0}
        ] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        prompt: "I feel cheerful: ",
        list: [ 
          {option: "Not at all", value: 0}, 
          {option: "Not often", value: 1}, 
          {option: "Sometimes", value: 2}, 
          {option: "Most of the time", value: 3}
        ] // 0 1 2 3
      },
      {
        categoryName: "Anxiety",
        prompt: "I can sit at ease and feel relaxed:",
        list: [ 
          {option: "Definitely", value: 0}, 
          {option: "Usually", value: 1},
          {option: "Not Often", value: 2},
          {option: "Not at all", value: 3}
        ] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        prompt: "I feel as if I am slowed down:",
        list: [ 
          {option: "Not at all", value: 3} ,
          {option: "Not often", value: 2},
          {option: "Sometimes", value: 1},
          {option: "Most of the time", value: 0}
        ] // 3 2 1 0
      },
      {
        categoryName: "Anxiety",
        prompt: "I get a sort of frightened feeling like 'butterflies' in the stomach:",
        list: [
          {option: "Not at all", value: 0},
          {option: "Occasionally", value: 1},
          {option: "Quite Often", value: 2},
          {option: "Very Often", value: 3}
        ] // 0 1 2 3
      },
      {
        categoryName: "Depression",
        prompt: "I have lost interest in my appearance:",
        list: [ 
          {option: "Definitely", value: 3} ,
          {option: "I don't take as much care as I should", value: 2},
          {option: "I may not take quite as much care", value: 1},
          {option: "I take just as much care as ever", value: 0}
        ] // 3 2 1 0
      },
      {
        categoryName: "Anxiety",
        prompt: "I feel restless as I have to be on the  move:",
        list: [ 
          {option: "Very much indeed", value: 3} ,
          {option: "Quite a lot", value: 2},
          {option: "Not very much", value: 1},
          {option: "Not at all", value: 0}
        ] // 3 2 1 0
      },
      {
        categoryName: "Depression",
        prompt: "I look forward with enjoyment to things:",
        list: [ 
          {option: "As much as I ever did", value: 0} ,
          {option: "Rather less than I used to", value: 1},
          {option: "Definitely less than I used to", value: 2},
          {option: "Hardly at all", value: 3}
        ] // 0 1 2 3
      },
      {
        categoryName: "Anxiety",
        prompt: "I get sudden feelings of panic:",
        list: [ 
          {option: "Very often indeed", value: 3} ,
          {option: "Quite often", value: 2},
          {option: "Not very often", value: 1},
          {option: "Not at all", value: 0}
        ] // 3 2 1 0
      },
      {
        categoryName: "Depression",
        prompt: "I can enjoy a good book or radio or TV program:",
        list: [ 
          {option: "Often", value: 0} ,
          {option: "Sometimes", value: 1},
          {option: "Not often", value: 2},
          {option: "Very seldom", value: 3}
        ] // 0 1 2 3
      },

    
    ];
  }

}