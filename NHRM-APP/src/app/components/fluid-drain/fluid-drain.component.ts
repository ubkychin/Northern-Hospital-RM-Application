import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { FluidDrainVideoComponent } from '../patient-resources/resources/fluid-drain-video/fluid-drain-video.component';

@Component({
  selector: 'app-fluid-drain',
  templateUrl: './fluid-drain.component.html',
  styleUrls: ['./fluid-drain.component.css']
})
export class FluidDrainComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  fluid: number;
  patient: Patient;

  constructor(public dialog: MatDialog, private dataService: DataService, private router: Router) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {
  }

  infoDialog() {
    this.dialog.open(FluidDrainVideoComponent, this.dialogConfig);
  }

  recordFluid() {
    console.log(this.patient)
    console.log(this.fluid);

    let measurementResult: MeasurementResult = {
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 5,
      'timeStamp': new Date(),
      'value': this.fluid
    }

    this.dataService.postMeasurementResult(measurementResult)
      .then(() => this.router.navigate(['/survey-nav']))
      .catch((err) => console.error(err + " Fluid ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
