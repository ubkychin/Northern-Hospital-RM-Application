import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.css']
})
export class LikertComponent implements OnInit {

  form: FormGroup;
  errorMsg: string;

  @Input() feelings: string[];
  @Output() likertValue: EventEmitter<Number> = new EventEmitter<Number>();

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      feeling: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(Number(this.form.value["feeling"]));
    this.likertValue.emit(Number(this.form.value["feeling"]));
  }

}
