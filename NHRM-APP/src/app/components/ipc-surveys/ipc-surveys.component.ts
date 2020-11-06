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
