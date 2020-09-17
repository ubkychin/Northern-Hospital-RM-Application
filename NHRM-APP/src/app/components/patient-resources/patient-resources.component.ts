import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VasInfoDialogComponent } from '../dialog-box/vas-info-dialog/vas-info-dialog.component';
import { FluidDrainVideoComponent } from '../patient-resources/resources/fluid-drain-video/fluid-drain-video.component';

@Component({
  selector: 'app-patient-resources',
  templateUrl: './patient-resources.component.html',
  styleUrls: ['./patient-resources.component.css']
})
export class PatientResourcesComponent implements OnInit {

  dialogConfig: MatDialogConfig;

  constructor(public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
   }

  ngOnInit(): void {
  }

  vasInfoDialog(){
    this.dialog.open(VasInfoDialogComponent, this.dialogConfig);
  }

  fluidDrainDialog(){
    this.dialog.open(FluidDrainVideoComponent, this.dialogConfig);
  }

}
