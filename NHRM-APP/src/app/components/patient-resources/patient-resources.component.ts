import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PatientResource } from 'src/app/models/patient-resource';

import { DataService } from 'src/app/services/data.service';
import { ResourceDialogComponent } from '../dialogs/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-patient-resources',
  templateUrl: './patient-resources.component.html',
  styleUrls: ['./patient-resources.component.css']
})
export class PatientResourcesComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  listOfResources: PatientResource[];
  filePath: string = "../assets/";

  constructor(public dialog: MatDialog, private dataService: DataService, private router: Router) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'information-dialog-container';
    if (this.dataService.patientResources == null) {
      this.dataService.getPatientResource("123456789")
        .then(() => this.listOfResources = this.dataService.patientResources)
        .finally(() => this.dataService.loading.next(false));
    }

    this.listOfResources = this.dataService.patientResources;
  }

  ngOnInit(): void {
  }

  showDialog(resource) {
    console.log(resource);
    this.dialogConfig.data = {
      content: resource.resContent.content,
      heading: resource.resContent.heading,
      video: resource.resContent.video
    }

    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }

  setPdfResource(resource) {
    this.dataService.pdfResource = this.filePath + resource.resContent;
  }
}
