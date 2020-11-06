import { Component, OnInit } from '@angular/core';
import { PatientResource } from 'src/app/models/patient-resource';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  listOfResources: PatientResource[];

  constructor(private dataService: DataService) {
    if (this.dataService.patientResources == null ||
      this.dataService.patientResources[0].categoryId != this.dataService.categoryChosen.getValue()) {
      this.dataService.getPatientResource(dataService.patient.value['urNumber'])
        .then((res) => this.listOfResources = this.dataService.patientResources)
        .catch((err) => console.log(err))
        .finally(() => this.dataService.loading.next(false));
    } else {
      this.listOfResources = this.dataService.patientResources
    }
  }

  ngOnInit(): void {
  }

}
