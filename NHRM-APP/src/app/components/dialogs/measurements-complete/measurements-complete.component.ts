import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-measurements-complete',
  templateUrl: './measurements-complete.component.html',
  styleUrls: ['./measurements-complete.component.css']
})
export class MeasurementsCompleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
