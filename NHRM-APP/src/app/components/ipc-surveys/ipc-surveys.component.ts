import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ipc-surveys',
  templateUrl: './ipc-surveys.component.html',
  styleUrls: ['./ipc-surveys.component.css']
})
export class IpcSurveysComponent implements OnInit {

  activeMeasurements: any[] = [];

  constructor(private dataService: DataService) {
    this.dataService.getDisabledMeasurements()
    .then((res) => {
      sessionStorage.setItem('disabledMeasurements', JSON.stringify(res));
    })
    .catch((err) => console.log(err))
    .finally(() => this.dataService.loading.next(false));
    
    this.activeMeasurements = [
      { meas: "ecog", id: 1, active: true },
      { meas: "qol", id: 5, active: true }
    ];

    this.dataService.disabledMeasurements.subscribe((data) => {
      data.forEach(number => {
        this.activeMeasurements.forEach(am => {
          if (am.id == number) {
            am.active = false;
          }
        })
      })
    });
  }

  ngOnInit(): void {
  }

}
