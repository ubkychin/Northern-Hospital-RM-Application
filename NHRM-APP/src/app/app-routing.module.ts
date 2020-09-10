import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SurveyNavComponent } from './components/survey-nav/survey-nav.component';
import { EcogStatusComponent } from './components/ecog-status/ecog-status.component';
import { LikertComponent } from './components/likert/likert.component';
import { VasBreathComponent } from './components/vas-breath/vas-breath.component';
import { VasPainComponent } from './components/vas-pain/vas-pain.component';
import { FluidDrainComponent } from './components/fluid-drain/fluid-drain.component';
import { QolComponent } from './components/qol/qol.component';
import { PatientResourcesComponent } from './components/patient-resources/patient-resources.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/navigation',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'navigation', component: NavigationComponent},
  {path: 'survey-nav', component: SurveyNavComponent},
  {path: 'ecog-status', component: EcogStatusComponent},
  {path: 'likert', component: LikertComponent},
  {path: 'vas-breath', component: VasBreathComponent},
  {path: 'vas-pain', component: VasPainComponent},
  {path: 'fluid-drain', component: FluidDrainComponent},
  {path: 'qol', component: QolComponent},
  {path: 'patient-resources', component: PatientResourcesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
