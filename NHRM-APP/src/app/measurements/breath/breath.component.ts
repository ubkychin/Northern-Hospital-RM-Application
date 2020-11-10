import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { ResourceDialogComponent } from '../../components/dialogs/resource-dialog/resource-dialog.component';
import { DataPointRecord } from 'src/app/models/data-point-record';
import { SuccessDialogComponent } from '../../components/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-vas-breath',
  templateUrl: './breath.component.html',
  styleUrls: ['./breath.component.css']
})
export class BreathComponent implements OnInit {


  readonly measurementId: number = 2;
  patient: Patient;
  measurementRecord: DataPointRecord[] = [];

  feelings: string[] = ["(Very Poor)", "(Poor)", "(Average)", "(Good)", "(Excellent)"];

  dialogConfig: MatDialogConfig;
  dialogInfo: ResourceDialog = {
    heading: "How to use the Likert scale",
    content: "To help you to best describe how good or bad you feel today, we have included five options to select - ranging from Very Poor to Excellent. Please select the option that describes how you feel today."
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

  getBreathScore(event) {
    console.log(event);
    this.measurementRecord.push({
      'measurementId': this.measurementId,
      'dataPointNumber': 1,
      'value': event
    });
    console.log(this.measurementRecord)

    this.recordVASBreath();

  }

  recordVASBreath() {
    let categoryList = [];

    this.patient.patientCategories.forEach(p => {
      if (p.measurementIds.find(m => m == this.measurementId)) {
        categoryList.push(p.categoryId);
      }
    })

    this.dataService.postMeasurementResult(this.measurementRecord, categoryList)
      .then(() => {
        this.dialogConfig.panelClass = 'success-dialog-container';
        this.dialog.open(SuccessDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
          this.router.navigate(['my-ipc']);
        });

      })
      .catch((err) => console.error(err + " Breath ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
