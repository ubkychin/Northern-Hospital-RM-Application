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
  selector: 'app-ecog-status',
  templateUrl: './ecog-status.component.html',
  styleUrls: ['./ecog-status.component.css']
})
export class EcogStatusComponent implements OnInit {

  readonly measurementId: number = 1;
  status: number;
  dialogConfig: MatDialogConfig;
  patient: Patient;
  error: boolean;
  errorMsg: string;

  dialogInfo: ResourceDialog = {
    heading: "How to record ECOG status",
    content: "To track how well you are able to take care of yourself, we have developed grades (from 0 to 4) that best describe how you feel physically.<p>Instruction: Click the check-box next to the number that best describes how you feel physically. From 0 - fully active - to 4 - completely disabled.</p><p>You must select a check-box before clicking Submit.</p>"
  }

  constructor(public dialog: MatDialog, private dataService: DataService, private router: Router) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'information-dialog-container';
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {
  }

  ecogStatus(value: number) {
    this.status = value;
    if (this.error) {
      this.error = false;
    }
  }

  openDialog() {
    this.dialogConfig.data = {
      content: this.dialogInfo.content,
      heading: this.dialogInfo.heading,
      video: this.dialogInfo.video
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }

  recordECOG() {
    if (!this.status) {
      this.error = true;
      this.errorMsg = "You must select a box before submitting";

    } else {
      let measurementRecord: DataPointRecord[] = [{
        'measurementId': this.measurementId,
        'dataPointNumber': 1,
        'value': this.status
      }];

      this.dataService.postMeasurementResult(measurementRecord, this.dataService.categoryChosen.getValue())
        .then(() => {
          this.dialogConfig.panelClass = 'success-dialog-container';
          this.dialog.open(SuccessDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
            this.router.navigate(['survey-nav']);
          });
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = "Something went wrong, please try again";
        })
        .finally(() => {
          console.log("Finalized");
          this.dataService.loading.next(false);
        });
    }
  }

}
