import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FrequencyChange } from 'src/app/models/frequency-change';
import { DataService } from 'src/app/services/data.service';
import { AlertDialogComponent } from '../dialogs/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-ipc',
  templateUrl: './ipc.component.html',
  styleUrls: ['./ipc.component.css']
})
export class IpcComponent implements OnInit {

  urNumber: string;
  dialogConfig: MatDialogConfig;
  duration: string;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.disableClose = false;
    this.urNumber = dataService.patient.value['urNumber'];
    dataService.getFrequencyChange(this.urNumber)
    .then((res: FrequencyChange) =>{
      console.log(res);
      if(res.change){
        this.getDuration(res.frequency);
        this.dialogConfig.panelClass = 'alert-dialog-container';
            this.dialogConfig.data = {
              content: 'Your Clinician has updated the duration at which you should be recording your Fluid Drainage, Breath and Pain. It is now expected <strong>' + this.duration + '</strong>',
              button: false
            }
            this.dialog.open(AlertDialogComponent, this.dialogConfig);
      }
    })
    .catch((err) => console.log(err))
    .finally(() => this.dataService.loading.next(false));
   }

  ngOnInit(): void { }

  getDuration(frequency) {
    switch (frequency) {
      case 1: this.duration = "Daily";
        break;
      case 2: this.duration = "Every Other Day";
        break;
      case 3: this.duration = "Twice Weekly";
        break;
      case 7: this.duration = "Weekly";
        break;
      case 28: this.duration = "Monthly"
    }
  }
  
}
