import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataPointRecord } from 'src/app/models/data-point-record';
import { Patient } from 'src/app/models/patient';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { DataService } from 'src/app/services/data.service';
import { ResourceDialogComponent } from '../dialogs/resource-dialog/resource-dialog.component';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-vas-pain',
  templateUrl: './vas-pain.component.html',
  styleUrls: ['./vas-pain.component.css']
})
export class VasPainComponent implements OnInit {

  readonly measurementId: number = 4;
  patient: Patient;
  vasScore: number[] = [];
  partA: boolean = true;
  measurementRecord: DataPointRecord[] = [];

  dialogConfig: MatDialogConfig;
  dialogInfo: ResourceDialog = {
    heading: "How to perform VAS score",
    content: "Instruction - To help you to best describe how good or bad you feel on a given day, we have drawn a scale from Best on the top of the slider to Worst on the bottom of the slider. Please position the slider at the point that describes how you feel today."
  }

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
    console.log(event);
    this.measurementRecord.push({
      'measurementId': this.measurementId,
      'dataPointNumber': 1,
      'value': event
    });
    this.partA = false;
  }

  getVasSliderScore(event) {
    console.log(parseInt(event));
    this.measurementRecord.push({
      'measurementId': this.measurementId,
      'dataPointNumber': 2,
      'value': parseInt(event)
    });
    this.recordVASPain();
  }

  recordVASPain() {
    this.dataService.postMeasurementResult(this.measurementRecord, this.dataService.categoryChosen.getValue())
      .then(() => {
        this.dialogConfig.panelClass = 'success-dialog-container';
        this.dialog.open(SuccessDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
          this.router.navigate(['survey-nav']);
        });

        let submittedMeasurements: number[] = this.dataService.submittedMeasurements.value;
        submittedMeasurements.push(this.measurementId);
        this.dataService.submittedMeasurements.next(submittedMeasurements);
      })
      .catch((err) => console.error(err + " Pain ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
