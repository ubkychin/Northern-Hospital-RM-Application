import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { Patient } from 'src/app/models/patient';
import { DataService } from 'src/app/services/data.service';
import { VasInfoDialogComponent } from '../dialog-box/vas-info-dialog/vas-info-dialog.component';

@Component({
  selector: 'app-vas-pain',
  templateUrl: './vas-pain.component.html',
  styleUrls: ['./vas-pain.component.css']
})
export class VasPainComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  status: number;
  patient: Patient;

  constructor(public dialog: MatDialog, private dataService: DataService, private router: Router) { 
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {
  }

  painStatus(value: number){
    this.status = value;
  }

  infoDialog(){
    this.dialog.open(VasInfoDialogComponent, this.dialogConfig);
  }

  recordVASPain() {
    console.log(this.status * 10)
    console.log(this.patient)

    let measurementResult: MeasurementResult = {
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 4,
      'timeStamp': new Date(),
      'value': this.status * 10
    }
    
    this.dataService.postMeasurementResult(measurementResult)
    .then(() => this.router.navigate(['/survey-nav']))
    .catch((err) => console.error(err + " Pain ERR"));
  }
  
}
