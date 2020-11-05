import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ipc-serveys',
  templateUrl: './ipc-serveys.component.html',
  styleUrls: ['./ipc-serveys.component.css']
})
export class IpcServeysComponent implements OnInit {

  activeMeasurements: any[] = [];

  constructor(private dataService: DataService) {
    dataService.getDisabledMeasurements()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => this.dataService.loading.next(false));

    this.activeMeasurements = [
      { meas: "ecog", active: true },
      { meas: "likert", active: true },
      { meas: "breath", active: true },
      { meas: "pain", active: true },
      { meas: "fluid", active: true },
      { meas: "qol", active: true },
      { meas: "hads", active: true }
    ];

    this.dataService.disabledMeasurements.subscribe((data) => {
      data.forEach(number => {
        this.activeMeasurements[number - 1].active = false;
      })
    });
   }

  ngOnInit(): void {
  }

}
