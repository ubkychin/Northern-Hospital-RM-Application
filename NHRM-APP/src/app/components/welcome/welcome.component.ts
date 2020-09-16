import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { TermsAndConditionsComponent } from '../dialog-box/terms-and-conditions/terms-and-conditions.component';
import { PrivacyStatementComponent } from '../dialog-box/privacy-statement/privacy-statement.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  terms: boolean;
  privacy: boolean;
  dialogConfig: MatDialogConfig;
  
  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
   }

  ngOnInit(): void {
  }

  submit(){
    if(this.terms && this.privacy){
      this.dataService.termsAcceptance.next(true);
    }
    else{
      alert("You must agree to both the Terms & Conditions and the Privacy Statement in order to proceed");
    }
  }

  openTerms(){
    this.dialog.open(TermsAndConditionsComponent, this.dialogConfig);
  }

  openPrivacy(){
    this.dialog.open(PrivacyStatementComponent, this.dialogConfig);
  }
}
