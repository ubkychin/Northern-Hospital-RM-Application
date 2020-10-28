import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vas-input',
  templateUrl: './vas-input.component.html',
  styleUrls: ['./vas-input.component.css']
})
export class VasInputComponent implements OnInit {

  vasScore: number;
  error: boolean;
  errorMsg: string;

  @Output() vasValue: EventEmitter<Number> = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {
  }

  submitVasScore(form) {
    if (form['value']['vas-input']) {
      this.vasScore = form['value']['vas-input'];
      console.log(form['value']['vas-input']);
      this.vasValue.emit(this.vasScore);

    } else {
      this.errorMsg  = "You must enter a value to proceed";
      this.error = true;
    }
  }
}
