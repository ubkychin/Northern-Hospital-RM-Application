import { Component, OnInit } from '@angular/core';
import { VasInfoDialogComponent } from '../dialog-box/vas-info-dialog/vas-info-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vas-breath',
  templateUrl: './vas-breath.component.html',
  styleUrls: ['./vas-breath.component.css']
})
export class VasBreathComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  status: number;
  patient: Patient;

  constructor(public dialog: MatDialog, private dataService: DataService, private router: Router) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    dataService.patient.subscribe(data => { this.patient = data });
  }


  ngOnInit(): void {
  }

  breathStatus(value: string) {
    this.status = parseInt(value);
  }

  infoDialog() {
    this.dialog.open(VasInfoDialogComponent, this.dialogConfig);
  }

  recordVASBreath() {
    console.log(this.status)
    console.log(this.patient)

    let measurementResult: MeasurementResult = {
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 3,
      'timeStamp': new Date(),
      'value': this.status
    }

    this.dataService.postMeasurementResult(measurementResult)
      .then(() => this.router.navigate(['/survey-nav']))
      .catch((err) => console.error(err + " Breath ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
