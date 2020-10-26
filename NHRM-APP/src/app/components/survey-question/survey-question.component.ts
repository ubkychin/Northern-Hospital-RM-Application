import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.css']
})
export class SurveyQuestionComponent implements OnInit {

  @Input() question: object = null; 

  constructor() { }

  ngOnInit(): void {

    console.log(this.question);
  }

}
