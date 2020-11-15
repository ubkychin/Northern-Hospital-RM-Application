import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ipc',
  templateUrl: './ipc.component.html',
  styleUrls: ['./ipc.component.css']
})
export class IpcComponent implements OnInit {

  urNumber: string;

  constructor(private dataService: DataService) {
    this.urNumber = dataService.patient.value['urNumber'];
    dataService.getFrequencyChange(this.urNumber)
    .then((res) =>{
      console.log(res);
    })
    .catch((err) => console.log(err))
    .finally(() => this.dataService.loading.next(false));
   }

  ngOnInit(): void { }

}
