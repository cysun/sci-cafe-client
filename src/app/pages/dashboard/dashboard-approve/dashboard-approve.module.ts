import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardApproveComponent } from './dashboard-approve.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ChartModule } from 'angular2-chartjs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

export const DashboardApproveRoutes: Routes = [
  {
    path: '',
    component: DashboardApproveComponent,
    data: {
      breadcrumb: 'Approve',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardApproveRoutes),
    SharedModule,
    ChartModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  declarations: [DashboardApproveComponent]
})
export class DashboardApproveModule { }
