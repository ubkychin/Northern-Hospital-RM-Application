import { Component, OnInit } from '@angular/core';
import { ConditionDetails } from 'src/app/models/condition-details';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  conditionDetails: ConditionDetails;
  urNumber: string;
  duration: string;
  breath: string;
  pain: string;

  constructor(private dataService: DataService) {
    this.urNumber = dataService.patient.value['urNumber'];
    this.dataService.getConditionsDetails(this.urNumber)
      .then(() => {
        this.conditionDetails = this.dataService.conditiondetails;
        if(this.dataService.conditiondetails.myDrainage){
          this.getDuration();
          this.getBreathFeeling();
          this.getPainFeeling();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => this.dataService.loading.next(false));
  }

  ngOnInit(): void {

  }

  getPainFeeling() {
    switch (this.conditionDetails.myDrainage.painScore) {
      case 1: this.pain = "No Pain";
        break;
      case 2: this.pain = "Mild";
        break;
      case 3: this.pain = "Moderate";
        break;
      case 4: this.pain = "Severe";
        break;
      case 5: this.pain = "Worst Possible"
    }
  }

  getBreathFeeling() {
    switch (this.conditionDetails.myDrainage.frequency) {
      case 1: this.breath = "Very Poor";
        break;
      case 2: this.breath = "Poor";
        break;
      case 3: this.breath = "Average";
        break;
      case 4: this.breath = "Good";
        break;
      case 5: this.breath = "Excellent"
    }
  }

  getDuration() {
    switch (this.conditionDetails.myDrainage.frequency) {
      case 1: this.duration = "Daily";
        break;
      case 2: this.duration = "Every Other Day";
        break;
      case 3: this.duration = "Twice Weekly";
        break;
      case 7: this.duration = "Weekly";
        break;
      case 28: this.duration = "Monthly"
    }
  }
}
