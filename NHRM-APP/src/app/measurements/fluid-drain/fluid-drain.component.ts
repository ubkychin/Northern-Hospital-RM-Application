import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Patient } from 'src/app/models/patient';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { DataService } from 'src/app/services/data.service';
import { ResourceDialogComponent } from '../../components/dialogs/resource-dialog/resource-dialog.component';
import { SuccessDialogComponent } from '../../components/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-fluid-drain',
  templateUrl: './fluid-drain.component.html',
  styleUrls: ['./fluid-drain.component.css']
})
export class FluidDrainComponent implements OnInit {

  readonly measurementId: number = 4;
  dialogConfig: MatDialogConfig;
  fluid: number;
  patient: Patient;
  errorMsg: string;

  dialogInfo: ResourceDialog = {
    heading: "How to drain your Indwelling Pleural Catheter",
    content: "Please enter the amount of fluid you have drained today in millilitres. Enter the value in the box. <p>Below is a video which details how to perform a fluid drainage of an Indwelling Pleural Catheter.</p>",
    video: "https://player.vimeo.com/video/270685188"
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

  submitFluid() {
    if (!this.fluid) {
      this.errorMsg = "You must enter the amount of fluid drained before submitting";
    } else {
      this.dialogConfig.panelClass = 'confirmation-dialog-container';
      this.dialogConfig.disableClose = true;
      this.dialogConfig.data = {
        heading: 'Fluid Amount',
        content: "You have entered <strong>" + this.fluid + " mL</strong> Would you like to confirm your selection?"
      }
      this.dialog.open(ConfirmationDialogComponent, this.dialogConfig).afterClosed().subscribe(option => {
        if (option)
          this.recordFluid();
      })
    }
  }

  recordFluid() {
    this.dataService.measurementRecord = [{
      'measurementId': this.measurementId,
      'dataPointNumber': 1,
      'value': this.fluid
    }];

    let categoryList = [];

    this.patient.patientCategories.forEach(p => {
      if (p.measurementIds.find(m => m == this.measurementId)) {
        categoryList.push(p.categoryId);
      }
    })

    this.dataService.postMeasurementResult(categoryList)
      .then(() => {
        this.dialogConfig.panelClass = 'success-dialog-container';
        this.dialogConfig.disableClose = false;
        let timer;
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterOpened().subscribe(() => {
          timer = setTimeout(() => {
            this.dialog.closeAll();
          }, 5000);
        });
        dialogRef.afterClosed().subscribe(() => {
          clearTimeout(timer);
          this.router.navigate(['my-ipc-drainage']);
        });
      })
      .catch((err) => {
        this.errorMsg = "Something went wrong, please try again";
      })
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
