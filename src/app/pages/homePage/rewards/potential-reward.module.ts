import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PotentialRewardComponent } from './potential-reward.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

export const PotentialRewardRoutes: Routes = [
  {
    path: '',
    component: PotentialRewardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PotentialRewardRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule ,
    FormsModule,
    QuillModule.forRoot(),
  ],
  declarations: [PotentialRewardComponent]
})
export class PotentialRewardModule { }
