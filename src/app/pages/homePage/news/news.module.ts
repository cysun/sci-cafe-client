import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import {RouterModule, Routes} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { PipesModule } from 'w-ng5';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

export const NewsRoutes: Routes = [
  {
    path: '',
    component: NewsComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(NewsRoutes),
    NgbModule,
    CalendarModule,
    PipesModule,
    NgxPaginationModule ,
    FormsModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
