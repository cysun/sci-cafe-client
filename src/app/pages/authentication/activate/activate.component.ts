import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  wrongToken: boolean = false;
  success: boolean = false;
  expired: boolean = false;
  inactive: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private routerInfo: ActivatedRoute
  ) {
    if (this.routerInfo.snapshot.queryParams["token"] == null) {
      this.inactive = true;
    } else {
      this.userService.activate(this.routerInfo.snapshot.queryParams["token"]).subscribe(
        data => {
          console.log(data);
          if (data['success'] === 'success') {
            this.inactive = false;
            this.success = true;
          }
          if (data['success'] === 'wrong token') {
            this.inactive = false;
            this.wrongToken = true;
          }
          if (data['success'] === 'expired') {
            this.inactive = false;
            this.expired = true;
          }
        }
      )
    }
  }


  ngOnInit() {

  }


}
