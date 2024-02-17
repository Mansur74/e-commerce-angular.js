import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { signIn } from '../../services/AuthService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRequest } from '../../interfaces/AuthRequest';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Output()
  signInEmitter : EventEmitter<boolean> = new EventEmitter();


  signInFormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });
  constructor(private router: Router) { }

  ngOnInit() {
  }


  async onSubmit()
  {
    if(this.signInFormGroup.valid)
    {
      const authRequest: AuthRequest = {email: this.email.value!, password: this.password.value!}
      const result = await signIn(authRequest);
      if(this.remember.value)
      {
        localStorage.setItem("refreshToken", result.data.data.refreshToken);
      }
      else 
      {
        sessionStorage.setItem("refreshToken", result.data.data.refreshToken);
      }
      this.signInEmitter.emit(true);
      this.router.navigate(["/product"]);

    }


  }

  get email() {
    return this.signInFormGroup.controls.email;
  }

  get password() {
    return this.signInFormGroup.controls.password;
  }

  get remember() {
    return this.signInFormGroup.controls.remember;
  }



}
