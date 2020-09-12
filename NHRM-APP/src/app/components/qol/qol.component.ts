import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';

@Component({
  selector: 'app-qol',
  templateUrl: './qol.component.html',
  styleUrls: ['./qol.component.css']
})
export class QolComponent implements OnInit {

  form = new FormGroup({});
  model: any = {
    questions: ["I have no problems in walking about", "I have slight problems in walking about", 
    "I have moderate problems in walking about", "I have severe problems in walking about", "I am unable to walk about"],
    score: 0
  };
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [ {
    key: 'score',
    type: 'radio',
    templateOptions: {
      required: true,
      label: "Mobility",
      options: [
          { value: 1, label: this.model.questions[0] },
          { value: 2, label: this.model.questions[1] },
          { value: 3, label: this.model.questions[2] },
          { value: 4, label: this.model.questions[3] },
          { value: 5, label: this.model.questions[4] },
        ],
      }
    }, 
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
