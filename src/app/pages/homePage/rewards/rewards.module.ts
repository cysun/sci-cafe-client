import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsComponent } from './rewards.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

export const RewardsRoutes: Routes = [
  {
    path: '',
    component: RewardsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RewardsRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule ,
    FormsModule
  ],
  declarations: [RewardsComponent]
})
export class RewardsModule { }
