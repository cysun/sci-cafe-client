import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './News.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {HttpModule} from '@angular/http';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2FileSizeModule } from 'ng2-file-size';
import { QuillModule } from 'ngx-quill';

export const NewsRoutes: Routes = [{
  path: '',
  component: NewsComponent,
  data: {
    breadcrumb: 'News',
    icon: 'icofont-contacts bg-c-pink'
  }
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NewsRoutes),
    SharedModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    ReactiveFormsModule,
    Ng2FileSizeModule,
    QuillModule.forRoot()
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
