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
  selector: 'app-fluid-drain',
  templateUrl: './fluid-drain.component.html',
  styleUrls: ['./fluid-drain.component.css']
})
export class FluidDrainComponent implements OnInit {

  readonly measurementId: number = 5;
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

  recordFluid() {
    if (!this.fluid) {
      this.errorMsg = "You must enter fluid amount before submitting";

    }else{
      let measurementRecord: DataPointRecord[] = [{
        'measurementId': this.measurementId,
        'dataPointNumber': 1,
        'value': this.fluid
      }];
  
      let categoryList = [];
      
      this.patient.patientCategories.forEach(p => {
        if(p.measurementIds.find(m => m == this.measurementId)){
          categoryList.push(p.categoryId);
        }
      })

      this.dataService.postMeasurementResult(measurementRecord, categoryList)
        .then(() => {
          this.dialogConfig.panelClass = 'success-dialog-container';
          this.dialog.open(SuccessDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
            this.router.navigate(['survey-nav']);
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
}
