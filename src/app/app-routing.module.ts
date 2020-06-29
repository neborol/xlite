import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { AuthGuard } from './guards/auth.guard';
import { RelieveComponent } from './components/relieve/relieve.component';
import { MemberEditComponent } from './components/membership/edit/userEdit.component';
import { UserEditResolver } from './resolvers/user-edit-resolver';
import { EditPhotosComponent } from './components/cockpit/edit-photos/edit-photos.component';
import { UsersListComponent } from './components/cockpit/edit-users/users-list.component';
import { EditFinancesComponent } from './components/cockpit/editFinances/editFinances.component';
import { EditnewsComponent } from './components/cockpit/editnews/editnews.component';
import { NewsComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { DonationsComponent } from './components/donations/donations.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FunctionsComponent } from './components/cockpit/functions/functions.component';
import { FaqComponent } from './components/faq/faq.component';
import { EditfaqComponent } from './components/cockpit/editfaq/editfaq.component';
import { VideosComponent } from './components/videos/videos.component';
import { EditvideosComponent } from './components/cockpit/editvideos/editvideos.component';
import { EditEventsComponent } from './components/cockpit/edit-events/edit-events.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'relieve', component: RelieveComponent},
  { path: 'user/edit', component: MemberEditComponent, resolve: {uniqueXX: UserEditResolver}},
  { path: 'login', component: LogInComponent },
  { path: 'cockpit', component: CockpitComponent, children: [
    { path: 'editphotos', component: EditPhotosComponent },
    { path: 'editphotos/:idx', component: EditPhotosComponent },
    { path: 'functions', component: FunctionsComponent },
    { path: 'userslist', component: UsersListComponent },
    { path: 'editFinances', component: EditFinancesComponent },
    { path: 'editFinances/:idx', component: EditFinancesComponent },
    { path: 'editnews', component: EditnewsComponent },
    { path: 'editnews/:idx', component: EditnewsComponent },
    { path: 'editvideos', component: EditvideosComponent },
    { path: 'editvideos/:idx', component: EditvideosComponent },
    { path: 'editfaq', component: EditfaqComponent },
    { path: 'editevents', component: EditEventsComponent },
    { path: 'editevents/:idx', component: EditEventsComponent },
    { path: '', pathMatch: 'full', component: EditPhotosComponent }
  ] },
  { path: 'register', component: RegisterComponent },
  { path: 'news', component: NewsComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'about', component: AboutComponent },
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
