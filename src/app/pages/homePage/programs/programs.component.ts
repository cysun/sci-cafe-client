import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { ProgramService } from '../../../services';
import { Program } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
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
export class ProgramsComponent implements OnInit {
  programs: Program[] = [];

  constructor(
    public http: Http,
    private programService: ProgramService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllPrograms();
  }

  private loadAllPrograms() {
    this.programService.getAllPrograms().subscribe(programs => {
        this.programs = programs;
    });
  }

  onClick(id:number) {
    
  }
}

