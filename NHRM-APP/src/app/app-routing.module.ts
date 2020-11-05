import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EcogStatusComponent } from './measurements/ecog-status/ecog-status.component';
import { LikertComponent } from './measurements/likert/likert.component';
import { VasBreathComponent } from './measurements/vas-breath/vas-breath.component';
import { VasPainComponent } from './measurements/vas-pain/vas-pain.component';
import { FluidDrainComponent } from './measurements/fluid-drain/fluid-drain.component';
import { QolComponent } from './measurements/qol/qol.component';
import { PatientResourcesComponent } from './components/patient-resources/patient-resources.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { QolVasComponent } from './measurements/qol-vas/qol-vas.component';
import { AuthGuard } from './guard/auth.guard';
import { PdfResourceComponent } from './components/pdf-resource/pdf-resource.component';
import { Error404Component } from './components/error404/error404.component';
import { IpcComponent } from './components/ipc/ipc.component';
import { IpcServeysComponent } from './components/ipc-serveys/ipc-serveys.component';
import { DrainageComponent } from './components/drainage/drainage.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: NavigationComponent, canActivate: [AuthGuard] },
  { path: 'patient-details', component: PatientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'ecog-status', component: EcogStatusComponent, canActivate: [AuthGuard] },
  { path: 'likert', component: LikertComponent, canActivate: [AuthGuard] },
  { path: 'vas-breath', component: VasBreathComponent, canActivate: [AuthGuard] },
  { path: 'vas-pain', component: VasPainComponent, canActivate: [AuthGuard] },
  { path: 'fluid-drain', component: FluidDrainComponent, canActivate: [AuthGuard] },
  {
    path: 'qol', component: QolComponent, canActivate: [AuthGuard],
    children: [
      { path: 'qol-vas', component: QolVasComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'qol-vas', component: QolVasComponent, canActivate: [AuthGuard] },
  { path: 'patient-resources', component: PatientResourcesComponent, canActivate: [AuthGuard] },
  { path: 'pdf-resource', component: PdfResourceComponent, canActivate: [AuthGuard] },
  { path: 'my-ipc', component: IpcComponent, canActivate: [AuthGuard] },
  { path: 'my-ipc-surveys', component: IpcServeysComponent, canActivate: [AuthGuard] },
  { path: 'my-ipc-drainage', component: DrainageComponent, canActivate: [AuthGuard] },
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
