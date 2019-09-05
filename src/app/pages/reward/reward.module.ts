import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardComponent } from './Reward.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {HttpModule} from '@angular/http';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuillModule } from 'ngx-quill';

export const RewardRoutes: Routes = [{
  path: '',
  component: RewardComponent,
  data: {
    breadcrumb: 'Reward',
    icon: 'icofont-contacts bg-c-pink'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RewardRoutes),
    SharedModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  declarations: [RewardComponent]
})
export class RewardModule { }
