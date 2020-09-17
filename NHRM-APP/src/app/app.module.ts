import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MatDialogModule } from '@angular/material/dialog';

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
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { TermsAndConditionsComponent } from './components/dialog-box/terms-and-conditions/terms-and-conditions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyStatementComponent } from './components/dialog-box/privacy-statement/privacy-statement.component';
import { VasInfoDialogComponent } from './components/dialog-box/vas-info-dialog/vas-info-dialog.component';
import { FluidDrainVideoComponent } from './components/patient-resources/resources/fluid-drain-video/fluid-drain-video.component';

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
    InfoBarComponent,
    SubmitButtonComponent,
    PatientDetailsComponent,
    TermsAndConditionsComponent,
    PrivacyStatementComponent,
    VasInfoDialogComponent,
    FluidDrainVideoComponent
  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyBootstrapModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  } 
 }
