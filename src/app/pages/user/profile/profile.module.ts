import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
// import {QuillEditorModule} from 'ngx-quill-editor';
import {HttpModule} from '@angular/http';
import {DataTableModule} from 'angular2-datatable';
// import {AngularEchartsModule} from 'ngx-echarts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // QuillEditorModule,
    HttpModule,
    DataTableModule,
    // AngularEchartsModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
