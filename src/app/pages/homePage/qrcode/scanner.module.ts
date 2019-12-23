import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScannerComponent } from './scanner.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


export const ScannerRoutes: Routes = [
  {
    path: '',
    component: ScannerComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ScannerRoutes),
    NgbModule,
    QRCodeModule,
    ZXingScannerModule.forRoot()
  ],
  declarations: [ScannerComponent]
})
export class ScannerModule { }
