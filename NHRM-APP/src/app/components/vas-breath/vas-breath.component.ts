import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Router } from '@angular/router';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';

@Component({
  selector: 'app-vas-breath',
  templateUrl: './vas-breath.component.html',
  styleUrls: ['./vas-breath.component.css']
})
export class VasBreathComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  dialogInfo: ResourceDialog = {
    heading: "How to perform VAS score",
    content: "Instruction - To help you to best describe how good or bad you feel on a given day, we have drawn a scale from Best on the top of the slider to Worst on the bottom of the slider. Please position the slider at the point that describes how you feel today."
  }
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
    this.dialogConfig.data = {
      content: this.dialogInfo.content,
      heading: this.dialogInfo.heading,
      video: this.dialogInfo.video
    }
    this.dialog.open(DialogBoxComponent, this.dialogConfig);
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
