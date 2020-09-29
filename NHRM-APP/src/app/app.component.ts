import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NHRM-APP';

  @ViewChild('bars') toggleNav: ElementRef;
  toggle: boolean = true;
  authorised: boolean;
  isRoot: boolean;

  constructor(private dataService: DataService, private router: Router,
    private location: Location, private renderer: Renderer2) {
    this.dataService.termsAcceptance.subscribe(data => {
      this.authorised = /* data; */true;
    })

    this.router.events.subscribe(event => {
      if (this.location.path() !== '/home')
        this.isRoot = false;
      else
        this.isRoot = true;
    })

    //Dropdown Nav
    this.renderer.listen('window', 'click', (e: Event) => {
      console.log("Clicked")

      console.log(e.target)
      console.log(this.toggleNav.nativeElement)

      if (e.target !== this.toggleNav.nativeElement) {
        this.toggle = true
      } else if (this.toggle == true) {
        this.toggle = false
      }
    })

  }

  goBack() {
    this.location.back();
  }

  dropdown() {

  }
}
