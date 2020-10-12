import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PdfViewerModule } from 'ng2-pdf-viewer';

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
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QolVasComponent } from './components/qol-vas/qol-vas.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { SafePipe } from './pipes/safe.pipe';
import { PatientResourcesOgComponent } from './components/patient-resources-og/patient-resources-og.component';
import { IpcSheetOgComponent } from './components/patient-resources-og/ipc-sheet-og/ipc-sheet-og.component';
import { PdfResourceComponent } from './components/pdf-resource/pdf-resource.component';
import { Call000Component } from './components/call000/call000.component';
import { Error404Component } from './components/error404/error404.component';
import { ResourceFilterPipe } from './pipes/resource-filter.pipe';

export function tokenGetter() {
  return JSON.parse(localStorage.getItem('Authorization'));
}
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
    PatientDetailsComponent,
    QolVasComponent,
    DialogBoxComponent,
    SafePipe,
    PatientResourcesOgComponent,
    IpcSheetOgComponent,
    PdfResourceComponent,
    Call000Component,
    Error404Component,
    ResourceFilterPipe
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
