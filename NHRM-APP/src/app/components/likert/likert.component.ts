import { AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from 'src/app/services/data.service';
import { Patient } from 'src/app/models/patient';
import { MatDialog, MatDialogConfig, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ResourceDialog } from 'src/app/models/resource-dialog';
import { MeasurementResult } from 'src/app/models/measurement-result';
import { ResourceDialogComponent } from '../dialogs/resource-dialog/resource-dialog.component';

@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.css']
})
export class LikertComponent implements OnInit {

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

  onSubmit() {
    let measurementResult: MeasurementResult[] = [{
      'hospitalNumber': this.patient.hospitalNumber,
      'categoryId': this.patient.categoryId,
      'dataPointNumber': 1,
      'measurementId': 2,
      'timeStamp': new Date(),
      'value': Number(this.form.value["feeling"])
    }];

    this.dataService.postMeasurementResult(measurementResult)
      .then(() => {
        this.router.navigate(['/survey-nav']);
      })
      .catch((err) => console.error(err + " Likert ERR"))
      .finally(() => {
        console.log("Finalized");
        this.dataService.loading.next(false);
      });
  }

  infoDialog(){
    this.dialogConfig.data = {
      content: this.dialogInfo.content,
      heading: this.dialogInfo.heading
    }
    this.dialog.open(ResourceDialogComponent, this.dialogConfig);
  }
}
