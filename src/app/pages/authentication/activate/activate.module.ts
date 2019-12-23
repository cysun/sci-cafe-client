import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateComponent } from './activate.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

export const activateRoutes: Routes = [
  {
    path: '',
    component: ActivateComponent,
    data: {
      breadcrumb: 'Activate'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(activateRoutes),
    SharedModule
  ],
  declarations: [ActivateComponent]
})
export class ActivateModule { }
