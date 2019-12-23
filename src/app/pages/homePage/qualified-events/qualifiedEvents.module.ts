import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualifiedEventsComponent } from './qualifiedEvents.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../../shared/shared.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { QuillModule } from 'ngx-quill'

export const QualifiedEventsRoutes: Routes = [
  {
    path: '',
    component: QualifiedEventsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(QualifiedEventsRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule,
    ZXingScannerModule.forRoot(),
    HttpModule,
    ReactiveFormsModule,
    DataTableModule,
    QuillModule.forRoot()
  ],
  declarations: [QualifiedEventsComponent]
})
export class QualifiedEventsModule { }
