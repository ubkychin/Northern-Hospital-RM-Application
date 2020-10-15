import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'app-hads',
  templateUrl: './hads.component.html',
  styleUrls: ['./hads.component.css']
})
export class HadsComponent implements OnInit {

  constructor(private dataService: DataService) {

   }

  ngOnInit(): void {
  }

}
