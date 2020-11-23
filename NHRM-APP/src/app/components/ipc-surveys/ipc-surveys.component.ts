import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MeasurementsCompleteComponent } from '../dialogs/measurements-complete/measurements-complete.component';

@Component({
  selector: 'app-ipc-surveys',
  templateUrl: './ipc-surveys.component.html',
  styleUrls: ['./ipc-surveys.component.css']
})
export class IpcSurveysComponent implements OnInit {

  activeMeasurements: any[] = [];
  dialogConfig: MatDialogConfig;

  constructor(private dataService: DataService, public dialog: MatDialog, private router: Router) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dataService.getDisabledMeasurements()
      .then((res) => {
        sessionStorage.setItem('disabledMeasurements', JSON.stringify(res));
        //Check if all measurements have been completed
        if (!this.activeMeasurements[0].active && !this.activeMeasurements[1].active) {
          //Alert user with dialog if measurements are complete
          this.dialogConfig.panelClass = 'measurements-complete-container';
          this.dialogConfig.disableClose = false;
          this.dialogConfig.data = {
            heading: "Measurements Complete",
            content: "You have successfully recorded your IPC surveys for today. <br>In a moment you will be taken back to My IPC",
          }
          let timer;
          let dialogRef = this.dialog.open(MeasurementsCompleteComponent, this.dialogConfig);
          dialogRef.afterOpened().subscribe(() =>
            timer = setTimeout(() => {
              this.dialog.closeAll();
            }, 10000))
          dialogRef.afterClosed()
            .subscribe(() => {
              clearTimeout(timer);
              this.router.navigate(['my-ipc']);
            });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => this.dataService.loading.next(false));

    this.activeMeasurements = [
      { meas: "ecog", id: 1, active: true },
      { meas: "qol", id: 5, active: true }
    ];

    this.dataService.disabledMeasurements.subscribe((data) => {
      data.forEach(number => {
        this.activeMeasurements.forEach(am => {
          if (am.id == number) {
            am.active = false;
          }
        })
      })
    });
  }

  ngOnInit(): void {
  }

}
