import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import noUiSlider from 'nouislider';

@Component({
  selector: 'app-vas-slider',
  templateUrl: './vas-slider.component.html',
  styleUrls: ['./vas-slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VasSliderComponent implements OnInit {

  currentHealthScore: Number;
  vasSlider: noUiSlider.Instance;
  errorMsg: string;

  @Output() vasValue: EventEmitter<Number> = new EventEmitter<Number>();

  constructor() {

  }

  ngOnInit(): void {
    var range_all_sliders = {
      'min': [0],
      'max': [100]
    };

    this.vasSlider = document.querySelector('.vas-slider');

    noUiSlider.create(this.vasSlider, {
      start: 50,
      range: range_all_sliders,
      pips: {
        mode: 'range',
        density: 1,
      },
    });

    this.vasSlider.noUiSlider.on('slide.one', (values) => {
      this.currentHealthScore = values[0];
    });

  }

  submitVasScore() {
    if (this.currentHealthScore) {
      console.log(this.currentHealthScore)
      this.vasValue.emit(this.currentHealthScore);
    } else {
      this.errorMsg = "You must position the slider before submitting";
    }
  }
}