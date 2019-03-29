import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { ProgramService } from '../../../services';
import { first } from 'rxjs/operators';
import { Program,User } from '../../../models';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-singlePrograms',
  templateUrl: './singleProgram.component.html',
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
export class SingleProgramComponent implements OnInit {
  program: Program;

  constructor(
    public http: Http,
    private programService: ProgramService,
    private route: ActivatedRoute,
    private router: Router,
    private routerInfo:ActivatedRoute
  ) { 

  }

  ngOnInit() {
    this.getProgramById(this.routerInfo.snapshot.queryParams["id"]);
  }

  private getProgramById(id:number) {
    this.programService.getProgramById(id).subscribe(program => {
        this.program = program;
    });
  }

}

