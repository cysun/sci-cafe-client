import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

export const EventsRoutes: Routes = [
  {
    path: '',
    component: EventsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EventsRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [EventsComponent]
})
export class EventsModule { }
