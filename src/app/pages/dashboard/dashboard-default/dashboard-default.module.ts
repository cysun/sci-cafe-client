import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDefaultComponent } from './dashboard-default.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ChartModule } from 'angular2-chartjs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

export const DashboardDefaultRoutes: Routes = [
  {
    path: '',
    component: DashboardDefaultComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardDefaultRoutes),
    SharedModule,
    ChartModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [DashboardDefaultComponent]
})
export class DashboardDefaultModule { }
