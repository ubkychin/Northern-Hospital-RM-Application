import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

@Component({
  selector: 'app-qol-vas',
  templateUrl: './qol-vas.component.html',
  styleUrls: ['./qol-vas.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class QolVasComponent implements OnInit {


  currentHealthScore: Number;
  vasSlider: noUiSlider.Instance;
  public min: Number;
  public max: Number;



  constructor() { }

  ngOnInit(): void {
    
    var range_all_sliders = {
      'min': [0],
      '25%': [25],
      '50%': [50],
      '75%': [75],
      'max': [100]
    };

    this.vasSlider = document.querySelector('.vas-slider') as noUiSlider.Instance;

      noUiSlider.create(this.vasSlider, {
        start: 0,
        range: range_all_sliders,
        pips: {
          mode: 'range',
          density: 1
        },
      });


      this.vasSlider.setAttribute('disabled', true);
  }

 
  updateSlider(event) {
    this.vasSlider.noUiSlider.set(event.target.value);
  }

}
