import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { ResourceDialogComponent } from '../../dialogs/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-help-info',
  templateUrl: './help-info.component.html',
  styleUrls: ['./help-info.component.css']
})
export class HelpInfoComponent implements OnInit {

  dialogConfig: MatDialogConfig;
  termsDialog: ResourceDialog = {
    heading: "Terms & Conditions",
    content: "Awaiting Northern Hospital to supply statement"
  }
  privacyDialog: ResourceDialog = {
    heading: "Privacy Statement",
    content: "Awaiting Northern Hospital to supply statement"
  }

  constructor(public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
  }

  ngOnInit(): void {
  }

  terms() {
    this.dialogConfig.panelClass = 'information-dialog-container';
    this.dialogConfig.data = {
      content: this.termsDialog.content,
      heading: this.termsDialog.heading
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }

  privacy() {
    this.dialogConfig.panelClass = 'information-dialog-container';
    this.dialogConfig.data = {
      content: this.privacyDialog.content,
      heading: this.privacyDialog.heading
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }

}
