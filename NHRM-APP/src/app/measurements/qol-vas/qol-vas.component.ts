import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import 'nouislider/distribute/nouislider.css';
import { DataPointRecord } from 'src/app/models/data-point-record';
import { Patient } from 'src/app/models/patient';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { DataService } from 'src/app/services/data.service';
import { ResourceDialogComponent } from '../../components/dialogs/resource-dialog/resource-dialog.component';
import { SuccessDialogComponent } from '../../components/dialogs/success-dialog/success-dialog.component';


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
  dialogInfo: ResourceDialog = {
    heading: "Quality of Life: Part 2",
    content: "There are two parts to this section - both require you to enter a number between 0 to 100. 100 means the best health you can imagine and 0 means the worst health you can imagine. <p/>Part 1 requires you to input a number between 0 and 100 - 100 meaning best possible health and 0 meaning worst possible health.</p>Part 2 requires you to touch the slider at the point you feel best represents your health. The left-hand side of the slider represents worst possible health, and the right-hand side represents best possible health. <p/>Click the 'submit' button to submit."
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
      heading: this.dialogInfo.heading
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
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
          this.router.navigate(['my-ipc']);
        });

      })
      .catch((err) => console.log(err + "Qol VAS ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
