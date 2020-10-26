import { AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from 'src/app/services/data.service';
import { Patient } from 'src/app/models/patient';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { ResourceDialogComponent } from '../dialogs/resource-dialog/resource-dialog.component';
import { DataPointRecord } from 'src/app/models/data-point-record';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.css']
})
export class LikertComponent implements OnInit {

  readonly measurementId: number = 2;
  model: any = {};
  form: FormGroup;
  patient: Patient;
  dialogConfig: MatDialogConfig;

  dialogInfo: ResourceDialog = {
    heading: "How to use the Likert scale",
    content: "Instruction - To help you to best describe how good or bad you feel today, we have included five options to select - ranging from Very Poor to Excellent. Please select the option that describes how you feel today."
  }

  constructor(public dialog: MatDialog, fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.form = fb.group({
      feeling: ['', Validators.required]
    });
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.panelClass = 'information-dialog-container';

    dataService.patient.subscribe(data => { this.patient = data });
  }

  ngOnInit(): void {

  }

  infoDialog() {
    this.dialogConfig.data = {
      content: this.dialogInfo.content,
      heading: this.dialogInfo.heading
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }

  onSubmit() {
    let measurementRecord: DataPointRecord[] = [{
      'measurementId': this.measurementId,
      'dataPointNumber': 1,
      'value': Number(this.form.value["feeling"])
    }];

    this.dataService.postMeasurementResult(measurementRecord, this.dataService.categoryChosen.getValue())
      .then(() => {
        this.dialogConfig.panelClass = 'success-dialog-container';
        this.dialog.open(SuccessDialogComponent, this.dialogConfig).afterClosed().subscribe(() => {
          this.router.navigate(['survey-nav']);
        });
      })
      .catch((err) => console.error(err + " Likert ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }

}
