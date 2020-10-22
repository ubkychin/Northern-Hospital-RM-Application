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

  getPatientResource(hospitalNumber: string) {
    this.loading.next(true);

    return new Promise((resolve, reject) => {
      this._http.get<PatientResource[]>(this.apiURL + "/patient/resources/" + hospitalNumber).subscribe(
        res => {
          console.log(res);
          this.patientResources = res;
          resolve();
        },
        err => {
          console.log(err.error);
          reject();
        }
      );
    })
    /* let resources: PatientResource[] = [{
      title: "Pleural Nurse Clinical Consultant",
      resType: "phone",
      prompt: "0428-167-972",
    },
    {
      title: "How to perform a Visual Analogue Score",
      resType: "dialog",
      prompt: "Click Here",
      resContent: {
        heading: "How to perform VAS score",
        content: "Instruction: To help you to best describe how good or bad you feel on a given day, we have drawn a scale from Best on the top of the slider to Worst on the bottom of the slider. Please position the slider at the point that describes how you feel today."
      }
    },
    {
      title: "How to drain your Indwelling Pleural Catheter",
      resType: "dialog",
      prompt: "Click Here",
      resContent: {
        heading: "How to drain your Indwelling Pleural Catheter",
        content: "Please enter the amount of fluid you have drained today in millilitres. Enter the value in the box. <p>Below is a video which details how to perform a fluid drainage of an Indwelling Pleural Catheter.</p>",
        video: "https://player.vimeo.com/video/270685188"
      }
    },
    {
      title: "Northern Health Respiratory Medicine",
      resType: "link",
      prompt: "Click Here",
      resContent: "https://www.nh.org.au/service/respiratory-medicine/"
    },
    {
      title: "How to drain your Indwelling Pleural Catheter",
      resType: "dialog",
      prompt: "Click Here",
      resContent: {
        heading: "How to drain your Indwelling Pleural Catheter",
        content: "Please enter the amount of fluid you have drained today in millilitres. Enter the value in the box. <p>Below is a video which details how to perform a fluid drainage of an Indwelling Pleural Catheter.</p>",
        video: "https://player.vimeo.com/video/270685188"
      }
    },
    {
      title: "Indwelling Pleural Catheter Information Sheet",
      resType: "pdf",
      prompt: "Click Here",
      resContent: 'IPC.pdf'
    },
    {
      title: "Northern Health Respiratory Medicine",
      resType: "link",
      prompt: "Click Here",
      resContent: "https://www.nh.org.au/service/respiratory-medicine/"
    },
    {
      title: "Northern Health Respiratory Medicine",
      resType: "link",
      prompt: "Click Here",
      resContent: "https://www.nh.org.au/service/respiratory-medicine/"
    }]; */
  }


  getHadsQuestions() {
    let list: any = [
      {
        categoryName: "Anxiety",
        question: "I feel tense or 'wound up':",
        answersList: [
          { answer: "Most of the time", value: 3 },
          { answer: "A lot of time", value: 2 },
          { answer: "From time to time, occasionally", value: 1 },
          { answer: "Not at all", value: 0 }
        ] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        question: "I still enjoy the things I used to enjoy:",
        answersList: [
          { answer: "Definitely as much", value: 0 },
          { answer: "Not quite so much", value: 1 },
          { answer: "Only a little", value: 2 },
          { answer: "Hardly at all", value: 3 }
        ] // 0, 1, 2, 3
      },
      {
        categoryName: "Anxiety",
        question: "I get a sort of frightened feeling as if something awful is about to happen:",
        answersList: [
          { answer: "Very definitely and quite badly", value: 3 },
          { answer: "Yes, but not too badly", value: 2 },
          { answer: "A little, but it doesn't worry me", value: 1 },
          { answer: "Not at all", value: 0 }
        ] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        question: "I can laugh and see the funny side of things:",
        answersList: [
          { answer: "As much as I always could", value: 0 },
          { answer: "Not quite so much now", value: 1 },
          { answer: "Definitely not so much now", value: 2 },
          { answer: "Not at all", value: 3 }
        ] // 0 1 2 3
      },
      {
        categoryName: "Anxiety",
        question: "Worrying thoughts go through my mind:",
        answersList: [
          { answer: "A great deal of the time", value: 3 },
          { answer: "A lot of the time", value: 2 },
          { answer: "From time to time, but not too often", value: 1 },
          { answer: "Only occasionally", value: 0 }
        ] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        question: "I feel cheerful: ",
        answersList: [
          { answer: "Not at all", value: 0 },
          { answer: "Not often", value: 1 },
          { answer: "Sometimes", value: 2 },
          { answer: "Most of the time", value: 3 }
        ] // 0 1 2 3
      },
      {
        categoryName: "Anxiety",
        question: "I can sit at ease and feel relaxed:",
        answersList: [
          { answer: "Definitely", value: 0 },
          { answer: "Usually", value: 1 },
          { answer: "Not Often", value: 2 },
          { answer: "Not at all", value: 3 }
        ] // 3, 2, 1, 0
      },
      {
        categoryName: "Depression",
        question: "I feel as if I am slowed down:",
        answersList: [
          { answer: "Not at all", value: 3 },
          { answer: "Not often", value: 2 },
          { answer: "Sometimes", value: 1 },
          { answer: "Most of the time", value: 0 }
        ] // 3 2 1 0
      },
      {
        categoryName: "Anxiety",
        question: "I get a sort of frightened feeling like 'butterflies' in the stomach:",
        answersList: [
          { answer: "Not at all", value: 0 },
          { answer: "Occasionally", value: 1 },
          { answer: "Quite Often", value: 2 },
          { answer: "Very Often", value: 3 }
        ] // 0 1 2 3
      },
      {
        categoryName: "Depression",
        question: "I have lost interest in my appearance:",
        answersList: [
          { answer: "Definitely", value: 3 },
          { answer: "I don't take as much care as I should", value: 2 },
          { answer: "I may not take quite as much care", value: 1 },
          { answer: "I take just as much care as ever", value: 0 }
        ] // 3 2 1 0
      },
      {
        categoryName: "Anxiety",
        question: "I feel restless as I have to be on the  move:",
        answersList: [
          { answer: "Very much indeed", value: 3 },
          { answer: "Quite a lot", value: 2 },
          { answer: "Not very much", value: 1 },
          { answer: "Not at all", value: 0 }
        ] // 3 2 1 0
      },
      {
        categoryName: "Depression",
        question: "I look forward with enjoyment to things:",
        answersList: [
          { answer: "As much as I ever did", value: 0 },
          { answer: "Rather less than I used to", value: 1 },
          { answer: "Definitely less than I used to", value: 2 },
          { answer: "Hardly at all", value: 3 }
        ] // 0 1 2 3
      },
      {
        categoryName: "Anxiety",
        question: "I get sudden feelings of panic:",
        answersList: [
          { answer: "Very often indeed", value: 3 },
          { answer: "Quite often", value: 2 },
          { answer: "Not very often", value: 1 },
          { answer: "Not at all", value: 0 }
        ] // 3 2 1 0
      },
      {
        categoryName: "Depression",
        question: "I can enjoy a good book or radio or TV program:",
        answersList: [
          { answer: "Often", value: 0 },
          { answer: "Sometimes", value: 1 },
          { answer: "Not often", value: 2 },
          { answer: "Very seldom", value: 3 }
        ] // 0 1 2 3
      },

    ];
  }

}