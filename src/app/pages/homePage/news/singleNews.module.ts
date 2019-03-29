import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleNewsComponent } from './singleNews.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

export const SingleNewsRoutes: Routes = [
  {
    path: '',
    component: SingleNewsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SingleNewsRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule ,
    FormsModule
  ],
  declarations: [SingleNewsComponent]
})
export class SingleNewsModule { }
