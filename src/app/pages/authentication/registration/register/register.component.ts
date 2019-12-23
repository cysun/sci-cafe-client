import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AlertService, UserService } from '../../../../services';
import { first } from 'rxjs/operators';
import { UserValidators} from '../../../../validators/user.validator';
import { EmailValidators} from '../../../../validators/email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  username = new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9_-]{8,15}$")]),this.uniqueUserService.userValidator());
  password = new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(15)]);
  email = new FormControl('', Validators.compose([Validators.required,Validators.email]),this.uniqueEmailService.emailValidator());
  rpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);
  emailError:boolean = false;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService:UserService,
    private uniqueUserService: UserValidators,
    private uniqueEmailService: EmailValidators
  ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      email:this.email,
      // unit:this.unit,
      // title:this.title,
      // position:this.position,
      rpassword:this.rpassword,
    });
  }


  checkEmail(email:string) {
    if(!email.toLocaleLowerCase().endsWith("@calstatela.edu")) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
  }


  onSubmit() {

  
    this.submitted = true;


        // stop here if form is invalid
        if (this.registerForm.invalid || this.emailError) {
            return;
        }

        this.userService.registers(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/authentication/activate']);
                },
                error => {
                    this.alertService.error(error);
                    this.submitted = false;
                });
  }

  

}
