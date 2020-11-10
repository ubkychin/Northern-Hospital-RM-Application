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
      { meas: "breath", id: 2, active: true },
      { meas: "pain", id: 3, active: true }
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
