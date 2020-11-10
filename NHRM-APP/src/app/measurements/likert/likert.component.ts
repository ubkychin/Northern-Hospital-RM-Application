import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.css']
})
export class LikertComponent implements OnInit {

  errorMsg: string;
  value: number;

  @Input() feelings: string[];
  @Output() likertValue: EventEmitter<Number> = new EventEmitter<Number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getValue(value){
    this.value = value;
    this.errorMsg = "";
  }

  submitLikert() {
    if(this.value){  
      this.likertValue.emit(this.value);
    }
    else
      this.errorMsg = "Please select an option before submitting";
  }

}
