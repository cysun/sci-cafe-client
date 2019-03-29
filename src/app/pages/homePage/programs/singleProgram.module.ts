import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProgramComponent } from './singleProgram.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

export const SingleEventRoutes: Routes = [
  {
    path: '',
    component: SingleProgramComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SingleEventRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule ,
    FormsModule
  ],
  declarations: [SingleProgramComponent]
})
export class SingleProgramModule { }
