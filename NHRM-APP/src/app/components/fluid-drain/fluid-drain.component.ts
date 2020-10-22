import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Patient } from 'src/app/models/patient';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { DataService } from 'src/app/services/data.service';
import { ResourceDialogComponent } from '../dialogs/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-fluid-drain',
  templateUrl: './fluid-drain.component.html',
  styleUrls: ['./fluid-drain.component.css']
})
export class FluidDrainComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  fluid: number;
  patient: Patient;
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
    console.log(this.patient)
    console.log(this.fluid);

    let measurementResult: MeasurementResult[] = [{
      'urNumber': this.patient.URNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 5,
      'timeStamp': new Date(),
      'value': this.fluid
    }];

    this.dataService.postMeasurementResult(measurementResult)
      .then(() => {
        this.router.navigate(['/survey-nav']);
      })
      .catch((err) => console.error(err + " Fluid ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
