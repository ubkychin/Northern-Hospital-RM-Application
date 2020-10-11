import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  selectCategory(value){
    this.dataService.categoryChosen = value;
  }

}
