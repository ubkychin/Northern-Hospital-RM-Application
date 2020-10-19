import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { ResourceDialogComponent } from '../dialogs/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  terms: boolean;
  privacy: boolean;
  dialogConfig: MatDialogConfig;
  termsDialog: ResourceDialog = {
    heading: "Terms & Conditions",
    content: "Awaiting Northern Hospital to supply statement"
  }
  privacyDialog: ResourceDialog = {
    heading: "Privacy Statement",
    content: "Awaiting Northern Hospital to supply statement"
  }

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'information-dialog-container';
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.terms && this.privacy) {
      this.dataService.termsAcceptance.next(true);
      localStorage.setItem('TermsAccepted', 'true');
    }
    else {
      this.terms = false;
      this.privacy = false;
    }
  }

  openTerms() {
    this.dialogConfig.data = {
      content: this.termsDialog.content,
      heading: this.termsDialog.heading
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }

  openPrivacy() {
    this.dialogConfig.data = {
      content: this.privacyDialog.content,
      heading: this.privacyDialog.heading
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }
}
