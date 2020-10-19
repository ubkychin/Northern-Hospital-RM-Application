import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vas-input',
  templateUrl: './vas-input.component.html',
  styleUrls: ['./vas-input.component.css']
})
export class VasInputComponent implements OnInit {

  vasScore: number;

  @Output() vasValue: EventEmitter<Number> = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {
  }

  submitVasScore(form){

    this.vasScore = form['value']['vas-input'];
    console.log(form['value']['vas-input']);

    this.vasValue.emit(this.vasScore);
    
  }
}
