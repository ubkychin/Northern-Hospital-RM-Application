import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FluidDrainVideoComponent } from '../patient-resources/resources/fluid-drain-video/fluid-drain-video.component';

@Component({
  selector: 'app-fluid-drain',
  templateUrl: './fluid-drain.component.html',
  styleUrls: ['./fluid-drain.component.css']
})
export class FluidDrainComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  fluid: number;

  constructor(public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
  }

  ngOnInit(): void {
  }

  fluidDrained() {
    console.log(this.fluid);
  }

  infoDialog() {
    this.dialog.open(FluidDrainVideoComponent, this.dialogConfig);
  }
}
