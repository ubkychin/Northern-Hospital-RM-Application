import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EcogStatusComponent } from './measurements/ecog-status/ecog-status.component';
import { BreathComponent } from './measurements/breath/breath.component';
import { PainComponent } from './measurements/pain/pain.component';
import { FluidDrainComponent } from './measurements/fluid-drain/fluid-drain.component';
import { QolComponent } from './measurements/qol/qol.component';
import { PatientResourcesComponent } from './components/patient-resources/patient-resources.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { QolVasComponent } from './measurements/qol-vas/qol-vas.component';
import { AuthGuard } from './guard/auth.guard';
import { PdfResourceComponent } from './components/pdf-resource/pdf-resource.component';
import { Error404Component } from './components/error404/error404.component';
import { IpcComponent } from './components/ipc/ipc.component';
import { IpcSurveysComponent } from './components/ipc-surveys/ipc-surveys.component';
import { DrainageComponent } from './components/drainage/drainage.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HelpInfoComponent } from './components/help/help-info/help-info.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EcogHelpComponent } from './components/help/ecog-help/ecog-help.component';
import { FluidHelpComponent } from './components/help/fluid-help/fluid-help.component';
import { PainHelpComponent } from './components/help/pain-help/pain-help.component';
import { BreathHelpComponent } from './components/help/breath-help/breath-help.component';
import { QolHelpComponent } from './components/help/qol-help/qol-help.component';
import { MeasurementGuard } from './guard/measurement.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: NavigationComponent, canActivate: [AuthGuard] },
  { path: 'patient-details', component: PatientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'ecog-status', component: EcogStatusComponent, canActivate: [AuthGuard, MeasurementGuard], data: { measurementId: 1 } },
  { path: 'breath', component: BreathComponent, canActivate: [AuthGuard, MeasurementGuard], data: { measurementId: 2 } },
  { path: 'pain', component: PainComponent, canActivate: [AuthGuard, MeasurementGuard], data: { measurementId: 3 } },
  { path: 'fluid-drain', component: FluidDrainComponent, canActivate: [AuthGuard, MeasurementGuard], data: { measurementId: 4 } },
  { path: 'qol', component: QolComponent, canActivate: [AuthGuard, MeasurementGuard], data: { measurementId: 5 } },
  { path: 'qol-vas', component: QolVasComponent, canActivate: [AuthGuard, MeasurementGuard], data: { measurementId: 5 } },
  { path: 'patient-resources', component: PatientResourcesComponent, canActivate: [AuthGuard] },
  { path: 'pdf-resource', component: PdfResourceComponent, canActivate: [AuthGuard] },
  { path: 'my-ipc', component: IpcComponent, canActivate: [AuthGuard] },
  { path: 'my-ipc-surveys', component: IpcSurveysComponent, canActivate: [AuthGuard] },
  { path: 'my-ipc-drainage', component: DrainageComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  {
    path: 'help-info', component: HelpInfoComponent, canActivate: [AuthGuard],
    children: [
      { path: 'help-ecog', component: EcogHelpComponent },
      { path: 'help-fluid', component: FluidHelpComponent },
      { path: 'help-pain', component: PainHelpComponent },
      { path: 'help-breath', component: BreathHelpComponent },
      { path: 'help-qol', component: QolHelpComponent }
    ]
  },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: '404-error', component: Error404Component },
  {
    path: '**',
    redirectTo: '/404-error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
