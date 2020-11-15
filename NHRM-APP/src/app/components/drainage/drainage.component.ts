import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-drainage',
  templateUrl: './drainage.component.html',
  styleUrls: ['./drainage.component.css']
})
export class DrainageComponent implements OnInit {

  activeMeasurements: any[] = [];
  errorMsg: string;

  constructor(private dataService: DataService, private router: Router) {
    this.dataService.getDisabledMeasurements()
      .then((res) => {
        sessionStorage.setItem('disabledMeasurements', JSON.stringify(res));
        if(!this.activeMeasurements[0].active && !this.activeMeasurements[1].active && !this.activeMeasurements[2].active){
          this.router.navigate(['my-ipc']);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => this.dataService.loading.next(false));

    this.activeMeasurements = [
      { meas: "fluid", id: 4, active: true },
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

  routeBreath() {
    if (!this.activeMeasurements[0].active) {
      this.router.navigate(['breath']);
    }
    else {
      this.errorMsg = "You must complete Fluid Drainage first"
    }
  }

  routePain() {
    if (!this.activeMeasurements[0].active) {
      this.router.navigate(['pain']);
    } else {
      this.errorMsg = "You must complete Fluid Drainage first"
    }
  }


}
