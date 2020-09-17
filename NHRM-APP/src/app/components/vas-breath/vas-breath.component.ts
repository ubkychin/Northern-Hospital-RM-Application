import { Component, OnInit } from '@angular/core';
import { VasInfoDialogComponent } from '../dialog-box/vas-info-dialog/vas-info-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-vas-breath',
  templateUrl: './vas-breath.component.html',
  styleUrls: ['./vas-breath.component.css']
})
export class VasBreathComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  status: number;

  constructor(public dialog: MatDialog) { 
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
  }


  ngOnInit(): void {
  }

  breathStatus(value: number){
    this.status = value;
  }

  infoDialog(){
    this.dialog.open(VasInfoDialogComponent, this.dialogConfig);
  }

  
}
