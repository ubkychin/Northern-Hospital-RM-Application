import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'NHRM-APP';

  @ViewChild('bars') toggleNav: ElementRef;
  unlistener: () => void;
  toggle: boolean = true;
  authorised: boolean;
  emergancy: boolean;
  loggedIn: boolean;
  isRoot: boolean;

  constructor(private dataService: DataService, private authService: AuthService, private router: Router,
    private location: Location, private renderer: Renderer2,
    private spinner: NgxSpinnerService) {

    //Change all these to True to bypass all Login and Agreement screens
    this.dataService.termsAcceptance.subscribe(data => {
      this.authorised = data; //true
    })
    this.authService.loggedIn.subscribe(data => {
      this.loggedIn = data; //true
    })
    this.dataService.emergancyAgreement.subscribe(data => {
      this.emergancy = data; //true
    })
    
    this.router.events.subscribe(event => {
      if (this.location.path() !== '/home')
        this.isRoot = false;
      else
        this.isRoot = true;
    })

    this.loadingSpinner();
  }

  ngOnInit(): void {
    /* this.router.navigate(['/home']); */
  }


  selectCategory(value){
    this.dataService.categoryChosen.next(value);
  }

  goBack() {
    this.location.back();
  }

  logout() {
    this.authService.logout();
    this.dataService.emergancyAgreement.next(false);
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

  loadingSpinner() {
    this.dataService.loading.subscribe((value) => {
      if (value) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
