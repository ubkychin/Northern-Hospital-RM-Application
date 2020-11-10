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

  constructor(private dataService: DataService) {
      this.dataService.getConditionsDetails()
    this.conditionDetails = this.dataService.conditiondetails;
  }

  ngOnInit(): void {
  }

}
