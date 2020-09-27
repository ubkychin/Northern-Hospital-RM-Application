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


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: NavigationComponent},
  {path: 'survey-nav', component: SurveyNavComponent},
  {path: 'ecog-status', component: EcogStatusComponent},
  {path: 'likert', component: LikertComponent},
  {path: 'vas-breath', component: VasBreathComponent},
  {path: 'vas-pain', component: VasPainComponent},
  {path: 'fluid-drain', component: FluidDrainComponent},
  {path: 'qol', component: QolComponent, 
          children: [{
              path:'qol-vas', component: QolVasComponent
          }]},
            
  {path: 'patient-resources', component: PatientResourcesComponent},
  {path: 'patient-details', component: PatientDetailsComponent},
  {path: 'ipc-sheet', component: IPCSheetComponent},
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
