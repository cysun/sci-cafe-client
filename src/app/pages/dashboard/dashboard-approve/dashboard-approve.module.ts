import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardApproveComponent } from './dashboard-approve.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
    FroalaViewModule.forRoot()
  ],
  declarations: [DashboardApproveComponent]
})
export class DashboardApproveModule { }
