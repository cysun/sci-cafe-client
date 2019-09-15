import { Component } from '@angular/core';
import { AuthenticationService } from './services';
import { HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  template: '<router-outlet><app-spinner></app-spinner></router-outlet>',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService,HttpClient],
})
export class AppComponent {
  title = 'app';
}
