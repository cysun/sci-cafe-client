import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { AlertService, AuthenticationService,UserService } from '../../../../services';
import { first } from 'rxjs/operators';
import { UserValidators} from '../../../../validators/user.validator';
import { EmailValidators} from '../../../../validators/email.validator';

@Component({
  selector: 'app-with-bg-image',
  templateUrl: './with-bg-image.component.html',
  styleUrls: ['./with-bg-image.component.css']
})
export class WithBgImageComponent implements OnInit {

  countDown = false;
 
  countDownTime = 60;  // countdown 60S
 
  showButtonText = "Send Code";

  wrongCode = undefined;

  registerForm: FormGroup;
  submitted = false; 
  returnUrl: string;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required,this.uniqueUserService.userValidator());
  password = new FormControl('', Validators.required);
  // unit = new FormControl('', Validators.required);
  // position = new FormControl('', Validators.required);
  // title = new FormControl('');
  email = new FormControl('', Validators.compose([Validators.required,Validators.email]),this.uniqueEmailService.emailValidator());
  rpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);
  code = new FormControl('',Validators.required);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
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
      code:this.code
    });
  }

  getCode(event) {
    
    if (this.registerForm.controls.email.invalid) {
      return;
    }
    this.userService.verifyEmail(this.registerForm.controls.email.value).pipe(first())
    .subscribe(
        data => {
            var now = new Date().getTime();
            localStorage.setItem('timeStamp',now.toString());
            localStorage.setItem('email',data['email']);
            var code = Number(data['code']);
            code = (code+7)*13; //encode verification code 
            localStorage.setItem('code',code.toString());
            this.sendMessage();
        },
        error => {
            this.alertService.error(error);
            this.submitted = false;
        });
    
  }

  verifyEmail() {
    var code = this.registerForm.controls.code.value;
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('timeStamp');
    if (now - Number(setupTime) > 10 * 60 *1000) {  //verification code will expire in 10 mins
      this.wrongCode = true;
    } else {
      var decoded = Number(localStorage.getItem('code')) / 13 - 7; // decode the verification code
      var email = localStorage.getItem('email');
      email = email.replace("itsadot426",".");
      console.log(email+"   " + decoded);
      if (email == this.registerForm.controls.email.value && decoded == this.registerForm.controls.code.value) {
        this.wrongCode = false;
      } else {
        this.wrongCode = true;
      }
    }
  }

  sendMessage() {      // verification code sent, countdown start
 
     this.countDown = true;                               // disable button for 60 seconds
   
     this.showButtonText = 'Sent(' +60+ 's)';                    
   
     const start = setInterval(() => {
   
           if (this.countDownTime >=0 ) {
   
                 this.showButtonText = 'Sent(' + this.countDownTime-- + 's)';         // 动态的进行倒计时
   
                  }  else {
   
                           clearInterval(start);                         // 如果超时则重新发送
   
                           this.showButtonText = 'Resend';
   
                           this.countDown = false;                  // 按钮再次变成可点击状态
   
                           this.countDownTime = 60;
   
                          }
   
                }, 1000);
   
  }
  

  onSubmit() {

    this.verifyEmail();

    console.log(this.wrongCode);

    if (this.wrongCode) {
      return;
    }

    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    localStorage.removeItem("email");
                    localStorage.removeItem("code");
                    localStorage.removeItem("timestamp");
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/authentication/login/with-bg-image']);
                },
                error => {
                    this.alertService.error(error);
                    this.submitted = false;
                });
  }

  

}
