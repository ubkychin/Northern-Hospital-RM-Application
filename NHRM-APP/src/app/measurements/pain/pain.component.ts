import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/components/dialogs/alert-dialog/alert-dialog.component';
import { Patient } from 'src/app/models/patient';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { DataService } from 'src/app/services/data.service';
import { ResourceDialogComponent } from '../../components/dialogs/resource-dialog/resource-dialog.component';
import { SuccessDialogComponent } from '../../components/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-vas-pain',
  templateUrl: './pain.component.html',
  styleUrls: ['./pain.component.css']
})
export class PainComponent implements OnInit {

  readonly measurementId: number = 3;
  patient: Patient;
  painScore: number;

  feelings: string[] = ["(Worst Possible)", "(Severe)", "(Moderate)", "(Mild)", "(No Pain)"];

  dialogConfig: MatDialogConfig;
  dialogInfo: ResourceDialog = {
    heading: "How to use the Likert scale",
    content: "To help you to best describe how much Pain your are experiencing today, we have included five options for you to select - ranging from Worst Possible to No Pain. Please select the option that describes how you feel today."
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

  getPainScore(event) {
    console.log(event);
    this.painScore = event;
    this.dataService.measurementRecord = [{
      'measurementId': this.measurementId,
      'dataPointNumber': 1,
      'value': this.painScore
    }];

    this.recordVASPain();
  }

  recordVASPain() {
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
          //Check if score is 'Worst Possible', open alert if so
          if (this.painScore == 1) {
            this.dialogConfig.panelClass = 'alert-dialog-container';
            this.dialogConfig.data = {
              content: 'You have reported you feel Worst Possible Pain. To speak to the Pleural team for advice,<br> call - 0428-167-972.<br><br>To speak to the Emergency Department between 1pm and 9pm, click the button below',
              button: true
            }
            let timer;
            let dialogRef = this.dialog.open(AlertDialogComponent, this.dialogConfig);
            dialogRef.afterOpened().subscribe(() => {
              timer = setTimeout(() => {
                this.dialog.closeAll();
              }, 30000)
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
      .catch((err) => console.error(err + " Pain ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
