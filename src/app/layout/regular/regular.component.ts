import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { Router } from '@angular/router';
import '../js/slick.min.js';


@Component({
  selector: 'regular',
  templateUrl: './regular.component.html',
  styleUrls: [
    '../css/slick.css',
    '../css/animate.css',
    '../css/nice-select.css',
    '../css/jquery.nice-number.min.css',
    '../css/magnific-popup.css',
    '../css/bootstrap.min.css',
    '../css/font-awesome.min.css',
    '../css/default.css',
    '../css/style.css',
    '../css/responsive.css',
  ]
})
export class RegularComponent implements OnInit {


  submitted = false;
  returnUrl: string;
  name: string;
  public navbarCollapsed = true;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.name = localStorage.getItem("name");
    console.log(this.name);
  }

  logOut() {
    this.authenticationService.logout();
    location.reload();
  }
}

