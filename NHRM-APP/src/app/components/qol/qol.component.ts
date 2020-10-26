import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { DataPointRecord } from 'src/app/models/data-point-record';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-qol',
  templateUrl: './qol.component.html',
  styleUrls: ['./qol.component.css']
})
export class QolComponent implements OnInit {

  public patient: Patient;
  model: any = {};
  isValid: boolean = true;
  measurementRecord: DataPointRecord[] = [];

  // The survey categories and questions retrieved from the API
  survey: any = [{
    categoryName: "Mobility",
    questions: ["I have no problems in walking about", "I have slight problems in walking about",
      "I have moderate problems in walking about", "I have severe problems in walking about", "I am unable to walk about"],
  },
  {
    categoryName: "Self Care",
    questions: ["I have no problems washing or dressing myself", "I have slight problems washing or dressing myself",
      "I have moderate problems washing or dressing myself", "I have severe problem washing or dressing myself",
      "I am unable to wash or dress myself"],
  },
  {
    categoryName: "Usual Activites",
    questions: ["I have no problems doing my casual activities", "I have slight problems doing my casual activites",
      "I have moderate problems doing my usual activities", "I have severe problems doing my usual activites",
      "I am unable to do my usual activities"]
  },
  {
    categoryName: "Pain/Discomfort",
    questions: ["I have no pain or discomfort", "I have slight pain or discomfort",
      "I have moderate pain or discomfort", "I have severe pain or discomfort",
      "I have extreme pain or discomfort"]
  },
  {
    categoryName: "Anxiety/Depression",
    questions: ["I am not anxious or depressed", "I am slightly anxious or depressed",
      "I am moderately anxious or depressed", "I severely am anxious or depressed",
      "I am extremely anxious or depressed"]
  }
  ];

  readonly measurementId: number = 6;
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[]
  form = new FormGroup({});
  currentCategory: number;
  dialogConfig: MatDialogConfig;

  constructor(public dialog: MatDialog, private router: Router, private dataService: DataService) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'information-dialog-container';
    dataService.patient.subscribe(data => { this.patient = data });
  }

  displayQuestions() {
    this.fields = [{
      key: this.survey[this.currentCategory].categoryName,
      type: 'radio',
      templateOptions: {
        options: [
          { value: 1, label: this.survey[this.currentCategory].questions[0] },
          { value: 2, label: this.survey[this.currentCategory].questions[1] },
          { value: 3, label: this.survey[this.currentCategory].questions[2] },
          { value: 4, label: this.survey[this.currentCategory].questions[3] },
          { value: 5, label: this.survey[this.currentCategory].questions[4] },
        ],
        required: true
      },

    }

    ];

  }

  ngOnInit(): void {
    this.currentCategory = 0;
    this.displayQuestions();
  }

  submit() {
    let categories = Object.keys(this.form.value);
    this.isValid = true;

    if (this.form.value[categories[this.currentCategory]] !== null) {
      if (this.currentCategory === this.survey.length - 1) {
        this.submitSurvey();
        //this.router.navigateByUrl('/qol-vas');
      }
      else{
        this.currentCategory += 1;
        this.displayQuestions();
      }
    } else {
      this.isValid = false;
    }
  }

  infoDialog() {

  }

  submitSurvey() {
    let categories = Object.keys(this.form.value);
    let date = new Date();

    for (let i = 0; i < categories.length; i++) {

      this.measurementRecord[i] = ({
        'measurementId': this.measurementId,
        'dataPointNumber': i + 1,
        'value': this.form.value[categories[i]]
      });
    }

    this.dataService.postMeasurementResult(this.measurementRecord, this.dataService.categoryChosen.getValue())
      .then(() => {
        this.dialogConfig.panelClass = 'success-dialog-container';
        this.dialog.open(SuccessDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
          this.router.navigate(['qol-vas']);
        });
      })
      .catch((err) => console.log(err + "Quality of Life Error"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
