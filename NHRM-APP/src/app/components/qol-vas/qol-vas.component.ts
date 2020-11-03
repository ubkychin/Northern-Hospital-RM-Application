import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import 'nouislider/distribute/nouislider.css';
import { DataPointRecord } from 'src/app/models/data-point-record';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';


@Component({
  selector: 'app-qol-vas',
  templateUrl: './qol-vas.component.html',
  styleUrls: ['./qol-vas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QolVasComponent implements OnInit {

  readonly measurementId: number = 6;
  dialogConfig: MatDialogConfig;
  isValid: Boolean = true;
  vasScore: number[] = [];
  patient: Patient;
  partA: boolean = true;
  measurementRecord: DataPointRecord[] = [];

  constructor(public dialog: MatDialog, private dataService: DataService, private router: Router) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'information-dialog-container';
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {
  }

  infoDialog() {

  }

  getVasInputScore(event) {
    console.log(event);
    this.measurementRecord.push({
      'measurementId': this.measurementId,
      'dataPointNumber': 6,
      'value': event
    });

    this.partA = false;
  }

  getVasSliderScore(event) {
    console.log(parseInt(event));
    this.measurementRecord.push({
      'measurementId': this.measurementId,
      'dataPointNumber': 7,
      'value': parseInt(event)
    });

    this.recordVASHealth();
  }
  recordVASHealth() {
    let categoryList = [];
      
    this.patient.patientCategories.forEach(p => {
      if(p.measurementIds.find(m => m == this.measurementId)){
        categoryList.push(p.categoryId);
      }
    })
    
    this.dataService.postMeasurementResult(this.measurementRecord, categoryList)
      .then(() => {
        this.dialogConfig.panelClass = 'success-dialog-container';
        this.dialog.open(SuccessDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
          this.router.navigate(['survey-nav']);
        });

        let submittedMeasurements: number[] = this.dataService.submittedMeasurements.value;
        submittedMeasurements.push(this.measurementId);
        this.dataService.submittedMeasurements.next(submittedMeasurements);
      })
      .catch((err) => console.log(err + "Qol VAS ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
