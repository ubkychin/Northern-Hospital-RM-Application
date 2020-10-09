import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/components/dialog-box/dialog-box.component';
import { PatientResource } from 'src/app/models/patient-resource';
import { ResourceDialog } from 'src/app/models/resource-dialog';

@Component({
  selector: 'app-patient-resources',
  templateUrl: './patient-resources.component.html',
  styleUrls: ['./patient-resources.component.css']
})
export class PatientResourcesComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  fluidDialog: ResourceDialog = {
    heading: "How to drain your Indwelling Pleural Catheter",
    content: "Please enter the amount of fluid you have drained today in millilitres. Enter the value in the box. <p>Below is a video which details how to perform a fluid drainage of an Indwelling Pleural Catheter.</p>",
    video: "https://player.vimeo.com/video/270685188"
  }
  vasDialog: ResourceDialog = {
    heading: "How to perform VAS score",
    content: "Instruction: To help you to best describe how good or bad you feel on a given day, we have drawn a scale from Best on the top of the slider to Worst on the bottom of the slider. Please position the slider at the point that describes how you feel today."
  }

  resource: PatientResource;
  resourceDialog: ResourceDialog;

  constructor(public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
   }

  ngOnInit(): void {
  }

  vasInfoDialog(){
    this.dialogConfig.data = {
      content: this.vasDialog.content,
      heading: this.vasDialog.heading,
      video: this.vasDialog.video
    }
    this.dialog.open(DialogBoxComponent, this.dialogConfig);
  }

  fluidDrainDialog(){
    this.dialogConfig.data = {
      content: this.fluidDialog.content,
      heading: this.fluidDialog.heading,
      video: this.fluidDialog.video
    }
    this.dialog.open(DialogBoxComponent, this.dialogConfig);
  }
}
