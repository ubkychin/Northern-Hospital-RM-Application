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
  unlistener: () => void;
  toggle: boolean = true;
  authorised: boolean;
  logedIn: boolean;
  isRoot: boolean;

  constructor(private dataService: DataService, private router: Router,
    private location: Location, private renderer: Renderer2) {
    this.dataService.termsAcceptance.subscribe(data => {
      this.authorised = data;
    })
    this.dataService.logedIn.subscribe(data => {
      this.logedIn = data;
    })
    
    this.router.events.subscribe(event => {
      if (this.location.path() !== '/home')
        this.isRoot = false;
      else
        this.isRoot = true;
    })
  }

  goBack() {
    this.location.back();
  }

  dropdown() {
    //Dropdown Nav
    this.toggle = false
    this.unlistener = this.renderer.listen('window', 'click', (e: Event) => {
      console.log("Clicked")
      if (e.target != this.toggleNav.nativeElement) {
        this.toggle = true
        this.unlistener();
      } 
    })
  }
}
