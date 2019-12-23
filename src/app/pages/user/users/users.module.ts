import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const UsersRoutes: Routes = [{
  path: '',
  component: UsersComponent,
  data: {
    breadcrumb: 'User',
    icon: 'icofont-contacts bg-c-pink'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    SharedModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ReactiveFormsModule,
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
