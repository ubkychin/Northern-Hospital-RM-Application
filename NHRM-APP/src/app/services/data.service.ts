import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../models/patient';
import { PatientResource } from '../models/patient-resource';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataPointRecord } from '../models/data-point-record';
import { ConditionDetails } from '../models/condition-details';
import { FrequencyChange } from '../models/frequency-change';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //apiURL = "https://localhost:5001/api";
  apiURL = "http://northernhealth-env.eba-9irxanfx.us-east-1.elasticbeanstalk.com/api";
  termsAcceptance: BehaviorSubject<boolean>;
  emergencyAgreement: BehaviorSubject<boolean>;
  patient: BehaviorSubject<Patient>;
  loading: BehaviorSubject<boolean>;
  patientResources: PatientResource[];
  pdfResource: string;
  categoryChosen: BehaviorSubject<any>;
  disabledMeasurements: BehaviorSubject<number[]>;
  conditiondetails: ConditionDetails;
  measurementRecord: DataPointRecord[];

  constructor(private _http: HttpClient, private jwtHelper: JwtHelperService) {
    this.disabledMeasurements = new BehaviorSubject([]);
    this.termsAcceptance = new BehaviorSubject(null);
    this.emergencyAgreement = new BehaviorSubject(null);
    this.loading = new BehaviorSubject(false);
    this.patient = new BehaviorSubject(null);
    this.categoryChosen = new BehaviorSubject(null);
    this.termsAcceptance.next(JSON.parse(localStorage.getItem('TermsAccepted')));

    if (localStorage.getItem('Authorization') && !this.patient.value) {
      this.getPatientDetails(this.jwtHelper.decodeToken().URNumber)
        .then(() => {
          console.log("Patient returned\nURNumber: " + this.patient.value['urNumber'])
          this.getDisabledMeasurements().then(data => {
            sessionStorage.setItem('disabledMeasurements', JSON.stringify(data));
          });
          sessionStorage.setItem('Patient', JSON.stringify(this.patient.value));
        })
        .catch((err) => console.log(err.error))
        .finally(() => {
          this.loading.next(false)
        });
    }
  }

  getDisabledMeasurements() {
    this.loading.next(true);
    return new Promise((resolve, reject) => {
      this._http.get<number[]>(this.apiURL + "/patient/disabledMeasurements/" + this.patient.value['urNumber']).subscribe(
        res => {
          this.disabledMeasurements.next(res);
          resolve(res);
        },
        err => {
          console.error(err.error)
          reject(err);
        });
    })
  }

  postMeasurementResult(categoryIdList: number[]) {
    this.loading.next(true);
    let params = new HttpParams();
    params = params.append('urNumber', this.patient.value['urNumber']);
    categoryIdList.forEach(c => {
      params = params.append('categoryIdList', c.toString())
    })
    return new Promise((resolve, reject) => {
      this._http.post(this.apiURL + "/patient/recordmeasurement",
        this.measurementRecord, {
        params: params
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
      this._http.get<PatientResource[]>(this.apiURL + "/patient/resources/" + urNumber, {
        params: new HttpParams().append('categoryId', this.categoryChosen.value)
      }).subscribe(
        res => {
          console.log(res);
          this.patientResources = res;
          resolve(res);
        },
        err => {
          console.error(err.error);
          reject();
        }
      );
    })
  }

  getConditionsDetails(urNumber: string) {
    this.loading.next(true);
    return new Promise((resolve, reject) => {
      this._http.get<ConditionDetails>(this.apiURL + "/patient/condition/" + urNumber, {
        params: new HttpParams().append('categoryId', this.categoryChosen.value)
      }).subscribe(
        res => {
          this.conditiondetails = res;
          resolve(res);
        },
        err => {
          console.error(err.error);
          reject();
        }
      );
    })
  }

  getFrequencyChange(urNumber: string) {
    this.loading.next(true);
    return new Promise((resolve, reject) => {
      this._http.get<FrequencyChange>(this.apiURL + "/patient/frequency/" + urNumber, {
        params: new HttpParams().append('categoryId', this.categoryChosen.value)
      }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.error(err.error);
          reject();
        }
      );
    })
  }

  getFrequency(urNumber: string, measurementId: number) {
    this.loading.next(true);
    return new Promise((resolve, reject) => {
      this._http.get(this.apiURL + "/patient/getFrequency/" + urNumber, {
        params: new HttpParams().append('measurementId', measurementId.toString())
      }).subscribe(
        res => {
          resolve(res);
        },
        err => {
          console.error(err.error);
          reject();
        }
      );
    })
  }
}