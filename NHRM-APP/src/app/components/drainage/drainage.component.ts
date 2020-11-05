import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-drainage',
  templateUrl: './drainage.component.html',
  styleUrls: ['./drainage.component.css']
})
export class DrainageComponent implements OnInit {

  activeMeasurements: any[] = [];

  constructor(private dataService: DataService) {
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
