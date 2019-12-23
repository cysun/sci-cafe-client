import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QrcodeComponent } from './qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';


export const QrcodeRoutes: Routes = [
  {
    path: '',
    component: QrcodeComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(QrcodeRoutes),
    NgbModule,
    QRCodeModule
  ],
  declarations: [QrcodeComponent]
})
export class QrcodeModule { }
