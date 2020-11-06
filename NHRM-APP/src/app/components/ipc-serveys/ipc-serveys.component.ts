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
    this.activeMeasurements = [
      { meas: "ecog", id: 1, active: true },
      { meas: "qol", id: 6, active: true }
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
