import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MeasurementsCompleteComponent } from '../dialogs/measurements-complete/measurements-complete.component';

@Component({
  selector: 'app-drainage',
  templateUrl: './drainage.component.html',
  styleUrls: ['./drainage.component.css']
})
export class DrainageComponent implements OnInit {

  activeMeasurements: any[] = [];
  errorMsg: string;
  dialogConfig: MatDialogConfig;

  constructor(private dataService: DataService, private router: Router, public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dataService.getDisabledMeasurements()
      .then((res) => {
        sessionStorage.setItem('disabledMeasurements', JSON.stringify(res));
        //Check if all measurements have been completed
        if (!this.activeMeasurements[0].active && !this.activeMeasurements[1].active && !this.activeMeasurements[2].active) {
          //Alert user with dialog if measurements are complete
          this.dialogConfig.panelClass = 'measurements-complete-container';
          this.dialogConfig.disableClose = false;
          this.dialogConfig.data = {
            heading: "Measurements Complete",
            content: "You have successfully recorded your IPC drainage for today. <br>In a moment you will be taken back to My IPC",
          }
          this.dialog.open(MeasurementsCompleteComponent, this.dialogConfig)
          .afterClosed()
          .subscribe(() => this.router.navigate(['my-ipc']));
          //Ensure dialog closes after 10 seconds and routes
          setTimeout(() => {
            this.dialog.closeAll();
          }, 10000)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => this.dataService.loading.next(false));

    this.activeMeasurements = [
      { meas: "fluid", id: 4, active: true },
      { meas: "breath", id: 2, active: true },
      { meas: "pain", id: 3, active: true }
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

  routeBreath() {
    if (!this.activeMeasurements[0].active) {
      this.router.navigate(['breath']);
    }
    else {
      this.errorMsg = "You must complete Fluid Drainage before entering how your Breathing feels"
    }
  }

  routePain() {
    if (!this.activeMeasurements[0].active) {
      this.router.navigate(['pain']);
    } else {
      this.errorMsg = "You must complete Fluid Drainage before entering how your Pain feels"
    }
  }

}
