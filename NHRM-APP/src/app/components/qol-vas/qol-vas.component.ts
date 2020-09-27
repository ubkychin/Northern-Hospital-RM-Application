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

  constructor() { }

  ngOnInit(): void {

    let vasSlider = document.querySelector('.vas-slider');

  var range_all_sliders = {
    'min': [0],
    'max': [100]
  };


    noUiSlider.create(vasSlider, {
      orientation: "vertical",
      start: 0,
      range: range_all_sliders,
      pips: {
        mode: 'range',
        density: 3
      },
      direction: 'rtl'
    });
  }

}
