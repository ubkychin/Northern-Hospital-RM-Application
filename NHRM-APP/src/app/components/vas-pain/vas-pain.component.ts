import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { VASPainDialogComponent } from '../patient-resources/resources/vas-pain-dialog/vas-pain-dialog.component';

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
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
  }

  ngOnInit(): void {
  }

  painStatus(value: number){
    this.status = value;
  }

  infoDialog(){
    this.dialog.open(VASPainDialogComponent, this.dialogConfig);
  }
  
}
