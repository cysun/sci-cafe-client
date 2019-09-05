import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleEventComponent } from './singleEvent.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill'

export const SingleEventRoutes: Routes = [
  {
    path: '',
    component: SingleEventComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SingleEventRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule ,
    FormsModule,
    QuillModule.forRoot()
  ],
  declarations: [SingleEventComponent]
})
export class SingleEventModule { }
