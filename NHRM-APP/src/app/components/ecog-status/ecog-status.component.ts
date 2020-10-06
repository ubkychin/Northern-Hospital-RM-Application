import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { ResourceDialog } from 'src/app/models/resource-dialog';

@Component({
  selector: 'app-ecog-status',
  templateUrl: './ecog-status.component.html',
  styleUrls: ['./ecog-status.component.css']
})
export class EcogStatusComponent implements OnInit {

  status: number;
  dialogConfig: MatDialogConfig;
  patient: Patient;
  dialogInfo: ResourceDialog = {
    heading: "How to record ECOG status",
    content: "To track how well you are able to take care of yourself, we have developed grades(from 0 to 4) that best describe how you feel physically.<p>Instruction: Click the check-box next to the number that best describes how you feel physically.From 0 - fully active - to 4 - completely disabled.</p>"
  }

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
    this.dialogConfig.data = {
      content: this.dialogInfo.content,
      heading: this.dialogInfo.heading,
      video: this.dialogInfo.video
    }
    this.dialog.open(DialogBoxComponent, this.dialogConfig);
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
