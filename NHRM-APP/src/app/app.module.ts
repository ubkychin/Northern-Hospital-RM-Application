import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FluidDrainComponent } from './measurements/fluid-drain/fluid-drain.component';
import { VasBreathComponent } from './measurements/vas-breath/vas-breath.component';
import { VasPainComponent } from './measurements/vas-pain/vas-pain.component';
import { QolComponent } from './measurements/qol/qol.component';
import { LikertComponent } from './measurements/likert/likert.component';
import { EcogStatusComponent } from './measurements/ecog-status/ecog-status.component';
import { PatientResourcesComponent } from './components/patient-resources/patient-resources.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QolVasComponent } from './measurements/qol-vas/qol-vas.component';
import { SafePipe } from './pipes/safe.pipe';
import { PdfResourceComponent } from './components/pdf-resource/pdf-resource.component';
import { VasSliderComponent } from './components/vas-slider/vas-slider.component';
import { Error404Component } from './components/error404/error404.component';
import { ResourceFilterPipe } from './pipes/resource-filter.pipe';
import { VasInputComponent } from './components/vas-input/vas-input.component';
import { ResourceDialogComponent } from './components/dialogs/resource-dialog/resource-dialog.component';
import { SuccessDialogComponent } from './components/dialogs/success-dialog/success-dialog.component';
import { DisclaimerDialogComponent } from './components/dialogs/disclaimer-dialog/disclaimer-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { SurveyQuestionComponent } from './components/survey-question/survey-question.component';
import { IpcComponent } from './components/ipc/ipc.component';
import { IpcSurveysComponent } from './components/ipc-surveys/ipc-surveys.component';
import { DrainageComponent } from './components/drainage/drainage.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HelpInfoComponent } from './components/help/help-info/help-info.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EcogHelpComponent } from './components/help/ecog-help/ecog-help.component';
import { FluidHelpComponent } from './components/help/fluid-help/fluid-help.component';
import { QolHelpComponent } from './components/help/qol-help/qol-help.component';
import { BreathHelpComponent } from './components/help/breath-help/breath-help.component';
import { PainHelpComponent } from './components/help/pain-help/pain-help.component';

export function tokenGetter() {
  return JSON.parse(localStorage.getItem('Authorization'));
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    NavigationComponent,
    FluidDrainComponent,
    VasBreathComponent,
    VasPainComponent,
    QolComponent,
    LikertComponent,
    EcogStatusComponent,
    PatientResourcesComponent,
    InfoBarComponent,
    PatientDetailsComponent,
    QolVasComponent,
    SafePipe,
    PdfResourceComponent,
    VasSliderComponent,
    Error404Component,
    ResourceFilterPipe,
    VasInputComponent,
    ResourceDialogComponent,
    SuccessDialogComponent,
    DisclaimerDialogComponent,
    AlertDialogComponent,
    SurveyQuestionComponent,
    IpcComponent,
    IpcSurveysComponent,
    DrainageComponent,
    SettingsComponent,
    HelpInfoComponent,
    ContactsComponent,
    EcogHelpComponent,
    FluidHelpComponent,
    QolHelpComponent,
    BreathHelpComponent,
    PainHelpComponent
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
    MatDialogModule,
    NgxSpinnerModule,
    HttpClientModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
