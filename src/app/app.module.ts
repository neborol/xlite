import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { DeferLoadModule } from '@trademe/ng-defer-load';
/* Routing */
import { AppRoutingModule } from './app-routing.module';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* FormsModule */
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Components */
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MissionComponent } from './components/mission/mission.component';
import { RelieveComponent } from './components/relieve/relieve.component';
import { Jan052019Component } from './components/mission-photographs/photos.component';
import { ImagesService } from './services/images.service';
import { MemberEditComponent } from './components/membership/edit/userEdit.component';
import { UserEditResolver } from './resolvers/user-edit-resolver';
import { CockpitComponent } from './components/cockpit/cockpit.component';
import { UsersListComponent } from './components/cockpit/edit-users/users-list.component';
import { EditFinancesComponent } from './components/cockpit/editFinances/editFinances.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { EditnewsComponent } from './components/cockpit/editnews/editnews.component';
import { NewsComponent } from './components/news/news.component';
import { AboutComponent } from './components/about/about.component';
import { DonationsComponent } from './components/donations/donations.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DiplomaticComponent } from './components/news/diplomatic/diplomatic.component';
import { GeneralComponent } from './components/news/general/general.component';
import { HomeAwayComponent } from './components/news/home-away/home-away.component';
import { NewsFlashComponent } from './components/news/news-flash/news-flash.component';
import { FunctionsComponent } from './components/cockpit/functions/functions.component';
import { GenericModalComponent } from './components/generic-modal/generic-modal.component';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './components/faq/faq.component';
import { EditfaqComponent } from './components/cockpit/editfaq/editfaq.component';
import { CockpitFaqService } from './services/cockpit-faq.service';
import { FaqService } from './services/faq.service';
import { MaterialFileInputModule, NGX_MAT_FILE_INPUT_CONFIG } from 'ngx-material-file-input';
import { NgxMaterialConfig } from './ngx-file-upload-config';
import { NewsService } from './services/news.service';
import { VideosComponent } from './components/videos/videos.component';
import { VideoService } from './components/videos/video.service';
import { RatingComponent } from './components/rating/rating.component';
import { MatVideoModule } from 'mat-video';
import { EditvideosComponent } from './components/cockpit/editvideos/editvideos.component';
import { EditPhotosComponent } from './components/cockpit/edit-photos/edit-photos.component';
import { CockpitPhotoService } from './services/cockpit-photos.service';

export function tokenGetter() {
  return localStorage.getItem('eliteToken');
}


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    RegisterComponent,
    LogInComponent,
    NavbarComponent,
    HomeComponent,
    MissionComponent,
    RelieveComponent,
    Jan052019Component,
    MemberEditComponent,
    CockpitComponent,
    EditPhotosComponent,
    UsersListComponent,
    EditFinancesComponent,
    EditnewsComponent,
    NewsComponent,
    AboutComponent,
    DonationsComponent,
    ActivitiesComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    DiplomaticComponent,
    GeneralComponent,
    HomeAwayComponent,
    NewsFlashComponent,
    FunctionsComponent,
    GenericModalComponent,
    FaqComponent,
    EditfaqComponent,
    VideosComponent,
    RatingComponent,
    EditvideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5001'],
        blacklistedRoutes: ['localhost:5001/api/auth']
      }
    }),
    AnimateOnScrollModule.forRoot(),
    DeferLoadModule,
    ReactiveFormsModule,
    MatVideoModule
  ],
  providers: [
    AuthService,
    ImagesService,
    UserEditResolver,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    ErrorInterceptor,
    CockpitFaqService,
    FaqService,
    NewsService,
    VideoService,
    CockpitPhotoService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [GenericModalComponent] // This is required in order for the modal to display.
})

export class AppModule { }
