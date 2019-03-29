import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routing';

import { AppComponent } from './app.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthComponent} from './layout/auth/auth.component';
import {RegularComponent} from './layout/regular/regular.component';
import {AuthenticationService,AlertService,UserService,ProgramService,EventService,NewsService, RewardService} from './services'
import {AuthGuard} from './guards'
import { HttpModule } from '@angular/http'
import {HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { JwtModule } from '@auth0/angular-jwt';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule} from 'angular-calendar';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegularComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    ClickOutsideModule,
    SharedModule,
    HttpModule,
    HttpClientModule,
    CalendarModule.forRoot({
    }),
    PipesModule,
    NgxPaginationModule,
    NgbModule,
  ],
  providers: [
    AuthenticationService,
    AlertService,
    UserService,
    AuthGuard,
    ProgramService,
    EventService,
    NewsService,
    RewardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
