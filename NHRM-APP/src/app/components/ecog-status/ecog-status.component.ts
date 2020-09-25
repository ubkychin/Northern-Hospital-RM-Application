import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EcogStatusDialogComponent } from '../dialog-box/ecog-status-dialog/ecog-status-dialog.component';

@Component({
  selector: 'app-ecog-status',
  templateUrl: './ecog-status.component.html',
  styleUrls: ['./ecog-status.component.css']
})
export class EcogStatusComponent implements OnInit {

  status: number;
  dialogConfig: MatDialogConfig;

  constructor(public dialog: MatDialog) { 
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
  }

  ngOnInit(): void {
  }

  ecogStatus(value: any) {
    this.status = value;
  }

  openDialog(){
    this.dialog.open(EcogStatusDialogComponent, this.dialogConfig);
  }

}
