import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qol-vas-slider',
  templateUrl: './qol-vas-slider.component.html',
  styleUrls: ['./qol-vas-slider.component.css']
})
export class QolVasSliderComponent implements OnInit {

  currentHealthScore: number;
  constructor() { }

  ngOnInit(): void {
  }


  getHealthScore(event) {
    this.currentHealthScore = event;

    console.log(this.currentHealthScore);
  }


  submitHealthScore() {

  }
}
