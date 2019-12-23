import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from '../program/program.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FileSizeModule } from 'ng2-file-size';
import { QuillModule } from 'ngx-quill';

export const ProgramRoutes: Routes = [{
  path: '',
  component: ProgramComponent,
  data: {
    breadcrumb: 'Program',
    icon: 'icofont-contacts bg-c-pink'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProgramRoutes),
    SharedModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ReactiveFormsModule,
    Ng2FileSizeModule,
    QuillModule.forRoot(),
  ],
  declarations: [ProgramComponent]
})
export class ProgramModule { }
