import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyEventsComponent } from './myEvents.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FileSizeModule } from 'ng2-file-size';
import { HttpModule } from '@angular/http';
import { QuillModule } from 'ngx-quill';
import { Tooltip } from 'materialize-css';

export const MyEventsRoutes: Routes = [
  {
    path: '',
    component: MyEventsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MyEventsRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    Ng2FileSizeModule,
    HttpModule,
    QuillModule.forRoot(),
  ],
  declarations: [MyEventsComponent]
})
export class MyEventsModule { }
