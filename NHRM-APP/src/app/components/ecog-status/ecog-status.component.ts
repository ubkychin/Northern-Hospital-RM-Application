import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecog-status',
  templateUrl: './ecog-status.component.html',
  styleUrls: ['./ecog-status.component.css']
})
export class EcogStatusComponent implements OnInit {

  status: number;

  constructor() { }

  ngOnInit(): void {
  }

  ecogStatus(value: any) {

    this.status = value;

  }

}
