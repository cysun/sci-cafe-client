import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './newslist.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FileSizeModule } from 'ng2-file-size';
import { QuillModule } from 'ngx-quill';

export const NewsListRoutes: Routes = [{
  path: '',
  component: NewsListComponent,
  data: {
    breadcrumb: 'News',
    icon: 'icofont-contacts bg-c-pink'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NewsListRoutes),
    SharedModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ReactiveFormsModule,
    Ng2FileSizeModule,
    QuillModule.forRoot(),
  ],
  declarations: [NewsListComponent]
})
export class NewsListModule { }
