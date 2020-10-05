import { Component, Input, OnInit } from '@angular/core';
import { ResourceDialog } from 'src/app/models/resource-dialog';

@Component({
  selector: 'app-vas-info-dialog',
  templateUrl: './vas-info-dialog.component.html',
  styleUrls: ['./vas-info-dialog.component.css']
})
export class VasInfoDialogComponent implements OnInit {

  resourceDialog: ResourceDialog;

  constructor() {
  }

  ngOnInit(): void {

    this.resourceDialog = {
      'heading': "How to perform VAS score",
      'content': "Instruction: To help you to best describe how good or bad you feel on a given day," 
      + "we have drawn a scale from Best on the top of the slider to Worst on the bottom of the slider."
      + "Please position the slider at the point that describes how you feel today."
    }

  }

}
