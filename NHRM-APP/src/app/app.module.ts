import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SurveyNavComponent } from './components/survey-nav/survey-nav.component';
import { FluidDrainComponent } from './components/fluid-drain/fluid-drain.component';
import { VasBreathComponent } from './components/vas-breath/vas-breath.component';
import { VasPainComponent } from './components/vas-pain/vas-pain.component';
import { QolComponent } from './components/qol/qol.component';
import { LikertComponent } from './components/likert/likert.component';
import { EcogStatusComponent } from './components/ecog-status/ecog-status.component';
import { PatientResourcesComponent } from './components/patient-resources/patient-resources.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    NavigationComponent,
    SurveyNavComponent,
    FluidDrainComponent,
    VasBreathComponent,
    VasPainComponent,
    QolComponent,
    LikertComponent,
    EcogStatusComponent,
    PatientResourcesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  } 
 }
