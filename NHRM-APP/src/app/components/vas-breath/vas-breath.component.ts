import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vas-breath',
  templateUrl: './vas-breath.component.html',
  styleUrls: ['./vas-breath.component.css']
})
export class VasBreathComponent implements OnInit {

  status: number;

  constructor() { }

  ngOnInit(): void {
  }

  breathStatus(value: number){
    this.status = value;
  }
  
}
