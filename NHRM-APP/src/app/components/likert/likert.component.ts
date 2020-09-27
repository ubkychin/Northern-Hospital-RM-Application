import { AfterContentInit, AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';


@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.css']
})
export class LikertComponent implements OnInit {

  model: any = {};

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      feeling: ['', Validators.required]
    });

    console.log(this.form);
  }

  ngOnInit(): void {

  }

  onSubmit() {
    
  }
}
