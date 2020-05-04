import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MissionComponent } from './components/mission/mission.component';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { AuthGuard } from './guards/auth.guard';
import { RelieveComponent } from './components/relieve/relieve.component';
import { MemberEditComponent } from './components/membership/edit/userEdit.component';
import { UserEditResolver } from './resolvers/user-edit-resolver';
import { PhotoUploadComponent } from './components/cockpit/photo-upload/photo-upload.component';
import { UsersListComponent } from './components/cockpit/users-list/users-list.component';
import { EditamountComponent } from './components/cockpit/editamount/editamount.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mission', component: MissionComponent, canActivate: [AuthGuard]},
  { path: 'relieve', component: RelieveComponent},
  { path: 'user/edit', component: MemberEditComponent, resolve: {uniqueXX: UserEditResolver}},
  { path: 'login', component: LogInComponent },
  { path: 'cockpit', component: CockpitComponent, children: [
    { path: 'uploadphotos', component: PhotoUploadComponent },
    { path: 'userslist', component: UsersListComponent },
    { path: 'editamount', component: EditamountComponent }
  ] },
  { path: 'register', component: RegisterComponent },
  { path: 'home', redirectTo: '' },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
