import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendeesComponent } from './attendees.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

export const AttendeesRoutes: Routes = [
  {
    path: '',
    component: AttendeesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AttendeesRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule ,
    FormsModule,
    SharedModule,
    ZXingScannerModule.forRoot()
  ],
  declarations: [AttendeesComponent]
})
export class AttendeesModule { }
