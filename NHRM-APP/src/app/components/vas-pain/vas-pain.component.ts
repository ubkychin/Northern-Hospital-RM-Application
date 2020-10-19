import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Patient } from 'src/app/models/patient';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { DataService } from 'src/app/services/data.service';
import { ResourceDialogComponent } from '../dialogs/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-vas-pain',
  templateUrl: './vas-pain.component.html',
  styleUrls: ['./vas-pain.component.css']
})
export class VasPainComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  dialogInfo: ResourceDialog = {
    heading: "How to perform VAS score",
    content: "Instruction - To help you to best describe how good or bad you feel on a given day, we have drawn a scale from Best on the top of the slider to Worst on the bottom of the slider. Please position the slider at the point that describes how you feel today."
  }
  patient: Patient;
  vasScore: number[] = [];
  partA: boolean = true;
  measurementResult: MeasurementResult[] = [];

  constructor(public dialog: MatDialog, private dataService: DataService, private router: Router) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'information-dialog-container';
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {
  }

  infoDialog() {
    this.dialogConfig.data = {
      content: this.dialogInfo.content,
      heading: this.dialogInfo.heading,
      video: this.dialogInfo.video
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }

  getVasInputScore(event) {
    this.vasScore.push(event);
    console.log("Pain Vas Input = " + this.vasScore[0])
    this.measurementResult.push({
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 4,
      'timeStamp': new Date(),
      'value': this.vasScore[0]
    });
    this.partA = false;
  }

  getVasSliderScore(event) {
    this.vasScore.push(parseInt(event));
    console.log("Pain Vas Slider = " + this.vasScore[1])
    this.measurementResult.push({
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 2,
      'measurementId': 4,
      'timeStamp': new Date(),
      'value': this.vasScore[1]
    });

    this.recordVASPain();
  }

  recordVASPain() {
    console.log(this.patient);
    console.log(this.measurementResult);

    this.dataService.postMeasurementResult(this.measurementResult)
      .then(() => {
        console.log("Pain Recorded");
        this.router.navigate(['/survey-nav']);
      })
      .catch((err) => console.error(err + " Pain ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
