import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-dashBoard',
  templateUrl: './dashBoard.component.html',
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
export class DashBoardComponent implements OnInit {

  isAdmin:string;

  constructor(

  ) { 

  }

  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin");
    console.log(this.isAdmin);
  }

}

