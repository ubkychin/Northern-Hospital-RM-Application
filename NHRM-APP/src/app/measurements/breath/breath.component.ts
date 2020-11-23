import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { ResourceDialogComponent } from '../../components/dialogs/resource-dialog/resource-dialog.component';
import { SuccessDialogComponent } from '../../components/dialogs/success-dialog/success-dialog.component';
import { AlertDialogComponent } from 'src/app/components/dialogs/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-vas-breath',
  templateUrl: './breath.component.html',
  styleUrls: ['./breath.component.css']
})
export class BreathComponent implements OnInit {


  readonly measurementId: number = 2;
  patient: Patient;
  breathScore: number;

  feelings: string[] = ["(Very Poor)", "(Poor)", "(Average)", "(Good)", "(Excellent)"];

  dialogConfig: MatDialogConfig;
  dialogInfo: ResourceDialog = {
    heading: "How to use the Likert scale",
    content: "To help you to best describe how good or bad your Breathing feels today, we have included five options for you to select - ranging from Very Poor to Excellent. Please select the option that describes how you feel today."
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
    this.breathScore = event;
    console.log(event);
    this.dataService.measurementRecord = [{
      'measurementId': this.measurementId,
      'dataPointNumber': 1,
      'value': this.breathScore
    }];

    this.recordVASBreath();

  }

  recordVASBreath() {
    let categoryList = [];

    this.patient.patientCategories.forEach(p => {
      if (p.measurementIds.find(m => m == this.measurementId)) {
        categoryList.push(p.categoryId);
      }
    })

    this.dataService.postMeasurementResult(categoryList)
      .then(() => {
        this.dialogConfig.panelClass = 'success-dialog-container';
        let timer;
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterOpened().subscribe(() => {
          timer = setTimeout(() => {
            this.dialog.closeAll();
          }, 3000);
        });
        dialogRef.afterClosed().subscribe(() => {
          clearTimeout(timer);
          //Check if score is 'Very Poor', open alert if so
          if (this.breathScore == 1) {
            this.dialogConfig.panelClass = 'alert-dialog-container';
            this.dialogConfig.data = {
              content: 'You have reported your Breathing feels very poor. To speak to the Pleural team for advice,<br> call - 0428-167-972.<br><br>To speak to the Emergency Department between 1pm and 9pm, click the button below',
              button: true
            }
            let timer;
            let dialogRef = this.dialog.open(AlertDialogComponent, this.dialogConfig);
            dialogRef.afterOpened().subscribe(() => {
              timer = setTimeout(() => {
                this.dialog.closeAll();
              }, 10000)
            });
            dialogRef.afterClosed()
              .subscribe(() => {
                clearTimeout(timer);
                this.router.navigate(['my-ipc-drainage']);
              });
          }
          else
            this.router.navigate(['my-ipc-drainage']);
        });
      })
      .catch((err) => console.error(err + " Breath ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
