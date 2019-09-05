import { EmailValidators} from '../../../validators/email.validator';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AlertService, AuthenticationService,UserService } from '../../../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  emailForm: FormGroup;
  email = new FormControl('', Validators.required,this.uniqueEmailService.emailValidator());
  submitted = false; 
  returnUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService:UserService,
    private uniqueEmailService: EmailValidators
  ) { }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email:this.email,
    });
  }

  get f() { return this.emailForm.controls; }

  onSubmit() {

    console.log("xxx")

    this.submitted = true;

        // // stop here if form is invalid
        // if (this.emailForm.invalid) {
        //   console.log("oooo")
        //     return;
        // }

        this.userService.resetPassword(this.emailForm.controls.email.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/authentication/login/with-bg-image']);
                },
                error => {
                    this.alertService.error(error);
                    this.submitted = false;
                });
  }


}
