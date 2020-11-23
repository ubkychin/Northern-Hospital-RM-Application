import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import 'nouislider/distribute/nouislider.css';
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

  readonly measurementId: number = 5;
  patient: Patient;

  dialogConfig: MatDialogConfig;
  dialogInfo: ResourceDialog = {
    heading: "Quality of Life: Part 2",
    content: "Part 2 requires you to touch the slider at the point you feel best represents your health. The left-hand side of the slider represents worst possible health, and the right-hand side represents best possible health. <br><br> Click the 'submit' button to submit."
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

  getVasSliderScore(event) {
    console.log(parseInt(event));
    this.dataService.measurementRecord.push({
      'measurementId': this.measurementId,
      'dataPointNumber': 6,
      'value': parseInt(event)
    });

    this.recordVASHealth();
  }

  recordVASHealth() {
    let categoryList = [];

    this.patient.patientCategories.forEach(p => {
      if (p.measurementIds.find(m => m == this.measurementId)) {
        categoryList.push(p.categoryId);
      }
    })

    this.dataService.postMeasurementResult(categoryList)
      .then(() => {
        this.dialogConfig.panelClass = 'success-dialog-container';
        let timer;
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        dialogRef.afterOpened().subscribe(() => {
          timer = setTimeout(() => {
            this.dialog.closeAll();
          }, 5000)
        });
        dialogRef.afterClosed().subscribe(() => {
          clearTimeout(timer);
          this.router.navigate(['my-ipc-surveys']);
        });
      })
      .catch((err) => console.log(err + "Qol VAS ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }
}
