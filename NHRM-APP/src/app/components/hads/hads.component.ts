import { CdkVirtualForOf } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'app-hads',
  templateUrl: './hads.component.html',
  styleUrls: ['./hads.component.css']
})
export class HadsComponent implements OnInit {

  survey: object;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.survey = this.dataService.getHadsQuestions();

    console.log(this.survey);
  }

}
