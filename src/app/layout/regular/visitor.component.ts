import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../services';
import '../js/slick.min.js';

@Component({
  selector: 'visitor',
  templateUrl: './visitor.component.html',
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
export class VisitorComponent implements OnInit {


  submitted = false; 
  returnUrl: string;

  constructor(
    private authenticationService:AuthenticationService
  ) { 
  }

  ngOnInit() {

  }

}

