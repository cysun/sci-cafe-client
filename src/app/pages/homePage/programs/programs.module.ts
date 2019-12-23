import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsComponent } from './programs.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

export const ProgramsRoutes: Routes = [
  {
    path: '',
    component: ProgramsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProgramsRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ProgramsComponent]
})
export class ProgramsModule { }
