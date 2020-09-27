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


  constructor() { }

  ngOnInit(): void {
    
    var range_all_sliders = {
      'min': [0],
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
  }

 
  updateSlider(event) {
    this.vasSlider.noUiSlider.set(event.target.value);
  }

}
