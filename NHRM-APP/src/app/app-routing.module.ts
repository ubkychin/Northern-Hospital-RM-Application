import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SurveyNavComponent } from './components/survey-nav/survey-nav.component';
import { EcogStatusComponent } from './components/ecog-status/ecog-status.component';
import { LikertComponent } from './components/likert/likert.component';
import { VasBreathComponent } from './components/vas-breath/vas-breath.component';
import { VasPainComponent } from './components/vas-pain/vas-pain.component';
import { FluidDrainComponent } from './components/fluid-drain/fluid-drain.component';
import { QolComponent } from './components/qol/qol.component';
import { PatientResourcesComponent } from './components/patient-resources/patient-resources.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { IPCSheetComponent } from './components/patient-resources/resources/ipc-sheet/ipc-sheet.component';
import {QolVasComponent} from './components/qol-vas/qol-vas.component';
import { AuthGuard } from './guard/auth.guard';
import { PatientResourcesOgComponent } from './components/patient-resources-og/patient-resources-og.component';
import { IpcSheetOgComponent } from './components/patient-resources-og/ipc-sheet-og/ipc-sheet-og.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: NavigationComponent, canActivate: [AuthGuard]},
  {path: 'survey-nav', component: SurveyNavComponent, canActivate: [AuthGuard]},
  {path: 'patient-details', component: PatientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'ecog-status', component: EcogStatusComponent, canActivate: [AuthGuard]},
  {path: 'likert', component: LikertComponent, canActivate: [AuthGuard]},
  {path: 'vas-breath', component: VasBreathComponent, canActivate: [AuthGuard]},
  {path: 'vas-pain', component: VasPainComponent, canActivate: [AuthGuard]},
  {path: 'fluid-drain', component: FluidDrainComponent, canActivate: [AuthGuard]},
  {path: 'qol', component: QolComponent, canActivate: [AuthGuard],
  children: [
    {path: 'qol-vas', component: QolVasComponent, canActivate: [AuthGuard]}
  ]},
  {path: 'qol-vas', component: QolVasComponent, canActivate: [AuthGuard]},
  {path: 'patient-resources', component: PatientResourcesComponent, canActivate: [AuthGuard]},
  {path: 'ipc-sheet', component: IPCSheetComponent, canActivate: [AuthGuard]},
  {path: 'patient-resources-og', component: PatientResourcesOgComponent, canActivate: [AuthGuard]},
  {path: 'ipc-sheet-og', component: IpcSheetOgComponent, canActivate: [AuthGuard]},
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
