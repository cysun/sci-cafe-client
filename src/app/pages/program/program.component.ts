import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { AlertService, AuthenticationService,ProgramService } from '../../services';
import { first } from 'rxjs/operators';
import { User,Program } from '../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: Program[] = [];

  selectedFiles: FileList;
  currentFileUpload: File;

  addProgramForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  name = new FormControl('', Validators.required);
  fullName = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  image = new FormControl('', []);


  constructor(
    public http: Http,
    private programService:ProgramService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllProgram();
    this.addProgramForm = new FormGroup({
      name:this.name,
      fullName:this.fullName,
      description:this.description,
      image:this.image
    });
  }

  private loadAllProgram() {
    this.programService.getAllPrograms().subscribe(program => {
        this.data = program;
    });
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  get f() { return this.addProgramForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addProgramForm.invalid) {
        return;
    }
    console.log(this.addProgramForm.value);

    this.programService.addProgram(this.addProgramForm.value,this.currentFileUpload)
        .pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Add an program successful', true);
                location.reload();
            },
            error => {
                this.submitted = false;
                this.alertService.error(error);
            });
}
  

selectFile(event) {
  this.selectedFiles = event.target.files;
  this.currentFileUpload = this.selectedFiles.item(0);
}

  onDelete(id:number) {
    this.programService.delete(id).pipe(first()).subscribe(data=>{
      location.reload();
    });
  }

  onClick(id:number) {
    
  }
}

