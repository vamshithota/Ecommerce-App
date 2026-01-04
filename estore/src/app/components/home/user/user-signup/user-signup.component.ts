import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup,AbstractControl,
  Validators } from '@angular/forms';
import { matchPasswords } from './validators/match-passwords.validator';
import { User } from '../../types/user.type';
import { UserService } from '../services/user.service';
import { NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css',
  providers: [],
})
export class UserSignupComponent {
  userSignupForm: FormGroup;
  alertMessage: string ='';
  alerType: number = 0 ;//0-success, 1-warning, 2-error

  constructor(private fb: FormBuilder, private userService : UserService){
    this.userSignupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      address: [''],
      city: [''],
      state: [''],
      pin: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: matchPasswords,
    }
  );
  }
  get firstName(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('firstName');
  }
  get email(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('email');
  }
  get password(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('password');
  }
  get confirmPassword(): AbstractControl<any, any> | null {
    return this.userSignupForm.get('confirmPassword');
  }

  onSubmit(): void {
    if(this.userSignupForm.invalid){
      this.alertMessage= 'Please fill all required fields correctly.';
      this.alerType= 1;
      this.userSignupForm.markAllAsTouched();
      return;
    }

    const {firstName, lastName, address, city, state, pin,email, password } = this.userSignupForm.value;
    const newUser: User ={firstName, lastName, address, city, state, pin,email, password};
    this.userSignupForm.disable();

    this.userService.createUser(newUser).subscribe({
      next: (result) =>{
        this.userSignupForm.enable();
        if(result.message === 'User registered successfully'){
          this.alertMessage= 'User created successfully';
          this.alerType= 0;
          this.userSignupForm.reset();
        }else if(result.message=== 'Email already exists'){
          this.alertMessage = 'Email already exists';
          this.alerType = 1;
        }
      },
      error: (err: HttpErrorResponse) =>{
        this.userSignupForm.enable();
        this.alertMessage = err.error?.message || 'an error occurred';
        this.alerType = 2;
      }
    });
  }

}
