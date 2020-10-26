import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DisclaimerDialogComponent } from '../dialogs/disclaimer-dialog/disclaimer-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  dialogConfig: MatDialogConfig;

  constructor(private dataService: DataService, public dialog: MatDialog) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.disableClose = true;
    this.dialogConfig.panelClass = 'disclaimer-dialog-container';
    if (sessionStorage.getItem('disclaimer') == null) {
      this.dialog.open(DisclaimerDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
        sessionStorage.setItem('disclaimer', 'accepted');
      });
    }
  }

  ngOnInit(): void {
  }

  selectCategory(value) {
    this.dataService.categoryChosen.next(value);
  }

  checkCategory(categoryId) {
    return JSON.parse(sessionStorage.getItem('Patient')).patientCategories
      .find(catId => catId.categoryId == categoryId);
  }

}
