import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vas-input',
  templateUrl: './vas-input.component.html',
  styleUrls: ['./vas-input.component.css']
})
export class VasInputComponent implements OnInit {

  vasScore: number;
  errorMsg: string;

  @Input() childItem : string;
  @Output() vasValue: EventEmitter<Number> = new EventEmitter<Number>();

  constructor() {
  }
  
  ngOnInit(): void {
  }

  submitVasScore() {
    if (this.vasScore) {
      console.log(this.vasScore);
      this.vasValue.emit(this.vasScore);

    } else {
      this.errorMsg  = "You must enter a value to proceed";
    }
  }
}
