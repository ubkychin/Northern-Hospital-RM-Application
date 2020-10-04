import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { EcogStatusDialogComponent } from '../dialog-box/ecog-status-dialog/ecog-status-dialog.component';

@Component({
  selector: 'app-ecog-status',
  templateUrl: './ecog-status.component.html',
  styleUrls: ['./ecog-status.component.css']
})
export class EcogStatusComponent implements OnInit {

  status: number;
  dialogConfig: MatDialogConfig;
  patient: Patient;

  constructor(public dialog: MatDialog, private dataService: DataService, private router: Router) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {
  }

  ecogStatus(value: number) {
    this.status = value;
    console.log(this.status)
  }

  openDialog() {
    this.dialog.open(EcogStatusDialogComponent, this.dialogConfig);
  }

  recordECOG() {
    console.log(this.patient)
    console.log(this.status);

    let measurementResult: MeasurementResult = {
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 1,
      'timeStamp': new Date(),
      'value': this.status
    }

    this.dataService.postMeasurementResult(measurementResult)
      .then(() => this.router.navigate(['/survey-nav']))
      .catch((err) => console.error(err + " ECOG ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }

}
