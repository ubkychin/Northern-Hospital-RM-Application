import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../models/patient';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientResource } from '../models/patient-resource';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataPointRecord } from '../models/data-point-record';

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
  categoryChosen: BehaviorSubject<any>;
  submittedMeasurements: BehaviorSubject<number[]>;

  constructor(private _http: HttpClient, private spinner: NgxSpinnerService, private jwtHelper: JwtHelperService) {
    this.submittedMeasurements = new BehaviorSubject([]);
    this.termsAcceptance = new BehaviorSubject(null);
    this.emergancyAgreement = new BehaviorSubject(null);
    this.loading = new BehaviorSubject(false);
    this.patient = new BehaviorSubject(null);
    this.categoryChosen = new BehaviorSubject(null);
    this.termsAcceptance.next(JSON.parse(localStorage.getItem('TermsAccepted')));

    if (localStorage.getItem('Authorization') && !this.patient.value) {
      this.getPatientDetails(this.jwtHelper.decodeToken().URNumber)
        .then(() => {
          console.log("Patient returned\nURNumber: " + this.patient.value['urNumber'])
          sessionStorage.setItem('Patient', JSON.stringify(this.patient.value));
        })
        .catch((err) => console.log(err.error))
        .finally(() => {
          this.loading.next(false)
        });
    }
  }

  postMeasurementResult(measurementRecord: DataPointRecord[], categoryId: number) {
    this.loading.next(true);
    console.log(measurementRecord);
    console.log(categoryId);
    return new Promise((resolve, reject) => {
      this._http.post(this.apiURL + "/patient/recordmeasurement",
        measurementRecord, {
          params: new HttpParams().append('urNumber', this.patient.value['urNumber'])
          .append('categoryId', categoryId.toString())
        }).subscribe(
          res => {
            console.log("MR Resolved")
            resolve(res);
          },
          err => {
            console.error(err.error)
            reject(err);
          });
    })
  }

  getPatientDetails(urNumber: string) {
    this.loading.next(true);
    return new Promise((resolve, reject) => {
      this._http.get<Patient>(this.apiURL + "/patient/patient/" + urNumber).subscribe(
        res => {
          this.patient.next(res);
          resolve(res);
        },
        err => {
          console.error(err.error)
          reject(err);
        });
    })

  }

  getPatientResource(urNumber: string) {
    this.loading.next(true);

    return new Promise((resolve, reject) => {
      this._http.get<PatientResource[]>(this.apiURL + "/patient/resources/" + urNumber).subscribe(
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
  }


  getHadsQuestions():object {
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

    return list;
  }

}