import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vas-pain',
  templateUrl: './vas-pain.component.html',
  styleUrls: ['./vas-pain.component.css']
})
export class VasPainComponent implements OnInit {

  status: number;

  constructor() { }

  ngOnInit(): void {
  }

  painStatus(value: number){
    this.status = value;
  }
  
}
