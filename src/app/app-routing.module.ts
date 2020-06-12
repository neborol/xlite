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
import { EditnewsComponent } from './components/cockpit/editnews/editnews.component';
import { NewsComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DonationsComponent } from './components/donations/donations.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FunctionsComponent } from './components/cockpit/functions/functions.component';
import { FaqComponent } from './components/faq/faq.component';
import { EditfaqComponent } from './components/cockpit/editfaq/editfaq.component';
import { VideosComponent } from './components/videos/videos.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mission', component: MissionComponent, canActivate: [AuthGuard]},
  { path: 'relieve', component: RelieveComponent},
  { path: 'user/edit', component: MemberEditComponent, resolve: {uniqueXX: UserEditResolver}},
  { path: 'login', component: LogInComponent },
  { path: 'cockpit', component: CockpitComponent, children: [
    { path: 'uploadphotos', component: PhotoUploadComponent },
    { path: 'functions', component: FunctionsComponent },
    { path: 'userslist', component: UsersListComponent },
    { path: 'editamount', component: EditamountComponent },
    { path: 'editnews', component: EditnewsComponent },
    { path: 'editfaq', component: EditfaqComponent },
    { path: '', pathMatch: 'full', component: PhotoUploadComponent }
  ] },
  { path: 'register', component: RegisterComponent },
  { path: 'news', component: NewsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'donations', component: DonationsComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'home', redirectTo: '' },
  // { path: '**', pathMatch: 'full', redirectTo: '' }
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
