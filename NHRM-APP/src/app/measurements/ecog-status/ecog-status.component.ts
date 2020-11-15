import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataPointRecord } from 'src/app/models/data-point-record';
import { Patient } from 'src/app/models/patient';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { DataService } from 'src/app/services/data.service';
import { ResourceDialogComponent } from '../../components/dialogs/resource-dialog/resource-dialog.component';
import { SuccessDialogComponent } from '../../components/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-ecog-status',
  templateUrl: './ecog-status.component.html',
  styleUrls: ['./ecog-status.component.css']
})
export class EcogStatusComponent implements OnInit {

  readonly measurementId: number = 1;
  value: string;
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

  submitEcog(value) {
    this.value = value;
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
    if (!this.value) {
      this.error = true;
      this.errorMsg = "Please select an option before submitting";

    } else {
      this.dataService.measurementRecord = [{
        'measurementId': this.measurementId,
        'dataPointNumber': 1,
        'value': parseInt(this.value)
      }];

      let categoryList = [];

      this.patient.patientCategories.forEach(p => {
        if (p.measurementIds.find(m => m == this.measurementId)) {
          categoryList.push(p.categoryId);
        }
      })

      console.log(categoryList);

      this.dataService.postMeasurementResult(categoryList)
        .then(() => {
          this.dialogConfig.panelClass = 'success-dialog-container';

          this.dialog.open(SuccessDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
            this.router.navigate(['my-ipc-surveys']);
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
