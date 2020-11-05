import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ipc',
  templateUrl: './ipc.component.html',
  styleUrls: ['./ipc.component.css']
})
export class IpcComponent implements OnInit {

  constructor(private dataService: DataService) {
    dataService.getDisabledMeasurements()
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => this.dataService.loading.next(false));
   }

  ngOnInit(): void {
  }

}
