import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-call000',
  templateUrl: './call000.component.html',
  styleUrls: ['./call000.component.css']
})
export class Call000Component implements OnInit {

  agreement: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.agreement)
    this.dataService.emergancyAgreement.next(true)
  }
}
