import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailComponent } from './userDetail.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
// import {QuillEditorModule} from 'ngx-quill-editor';
import {HttpModule} from '@angular/http';
import {DataTableModule} from 'angular2-datatable';
// import {AngularEchartsModule} from 'ngx-echarts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const userDetailRoutes: Routes = [
  {
    path: '',
    component: UserDetailComponent,
    data: {
      breadcrumb: 'UserDetail',
      icon: 'icofont-info-circle bg-c-green'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userDetailRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // QuillEditorModule,
    HttpModule,
    DataTableModule,
    // AngularEchartsModule
  ],
  declarations: [UserDetailComponent]
})
export class UserDetailModule { }
