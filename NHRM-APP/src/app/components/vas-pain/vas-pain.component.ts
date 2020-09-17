import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VasInfoDialogComponent } from '../dialog-box/vas-info-dialog/vas-info-dialog.component';

@Component({
  selector: 'app-vas-pain',
  templateUrl: './vas-pain.component.html',
  styleUrls: ['./vas-pain.component.css']
})
export class VasPainComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  status: number;

  constructor(public dialog: MatDialog) { 
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
  }

  ngOnInit(): void {
  }

  painStatus(value: number){
    this.status = value;
  }

  infoDialog(){
    this.dialog.open(VasInfoDialogComponent, this.dialogConfig);
  }
  
}
