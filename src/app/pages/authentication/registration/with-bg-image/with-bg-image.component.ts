import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AlertService, AuthenticationService,UserService } from '../../../../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html',
  styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  unit = new FormControl('', Validators.required);
  position = new FormControl('', Validators.required);
  title = new FormControl('');
  email = new FormControl('', [Validators.required,Validators.email]);
  rpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService:UserService
  ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email:this.email,
      unit:this.unit,
      title:this.title,
      position:this.position,
      rpassword:this.rpassword
    });
  }

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

}
