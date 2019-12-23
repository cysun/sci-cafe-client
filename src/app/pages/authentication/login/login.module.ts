import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WithBgImageComponent } from './with-bg-image/with-bg-image.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const LoginRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Login'
    },
    children: [
      {
        path: 'with-bg-image',
        component: WithBgImageComponent,
        data: {
          breadcrumb: 'Login'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [WithBgImageComponent]
})
export class LoginModule { } 
