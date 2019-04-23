import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEventsComponent } from './myEvents.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';

export const MyEventsRoutes: Routes = [
  {
    path: '',
    component: MyEventsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MyEventsRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule ,
    FormsModule,
  ],
  declarations: [MyEventsComponent]
})
export class MyEventsModule { }
