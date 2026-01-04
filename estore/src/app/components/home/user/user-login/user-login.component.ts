import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginToken } from '../../types/user.type';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  userLoginForm: FormGroup;
  alertType: number =0;
  alertMessage: string ='';

  constructor(private fb: FormBuilder, private userService: UserService){
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email(): AbstractControl<any, any> | null{
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }

  onSubmit(): void{

    if(this.userLoginForm.invalid){
      this.alertMessage= 'Please fill both email and password.';
      this.alertType=1;
      this.userLoginForm.markAllAsTouched();
      return;
    }

    const {email, password} = this.userLoginForm.value;

    this.userLoginForm.disable();
    this.userService.login(email, password).subscribe({
      next: (result: LoginToken) =>{
        this.userLoginForm.enable();

        if(result.token){
          this.userService.activateToken(result);
          this.alertMessage= 'Login Successful';
          this.alertType=0;
          this.userLoginForm.reset();
        }else{
          this.alertMessage = 'Invalid login attempt.';
          this.alertType=1;
        }
      },
      error: (err) =>{
        this.userLoginForm.enable();
        this.alertMessage = err.error?.message || 'Login Failed. Please try again.';
        this.alertType=2;
      }
     });
  }
}
