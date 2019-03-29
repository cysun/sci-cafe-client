import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { AlertService, AuthenticationService,UserService } from '../../../services';
import { first } from 'rxjs/operators';
import { User } from '../../../models';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  data: User[] = [];

  registerForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  password = new FormControl('123456', []);
  unit = new FormControl('', Validators.required);
  position = new FormControl('', Validators.required);
  title = new FormControl('');
  email = new FormControl('', [Validators.required,Validators.email]);

  constructor(
    public http: Http,
    private userService: UserService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
  ) { 

  }

  ngOnInit() {
    this.loadAllUsers();
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email:this.email,
      unit:this.unit,
      title:this.title,
      position:this.position
    });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => {
        this.data = users;
    });
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/authentication/login/with-bg-image']);
                },
                error => {
                    this.alertService.error(error);
                    this.submitted = false;
                });
  }

  onDelete(id:number) {
    this.userService.delete(id).pipe(first()).subscribe(data=>{
      location.reload();
    });
  }

  onClick(id:number) {
    this.router.navigate(['/'])
  }
}

