import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MissionComponent } from './components/mission/mission.component';
import { AuthGuard } from './guards/auth.guard';
import { RelieveComponent } from './components/relieve/relieve.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mission', component: MissionComponent, canActivate: [AuthGuard]},
  { path: 'relieve', component: RelieveComponent},
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', redirectTo: '' },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
