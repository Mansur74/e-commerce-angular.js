import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/User';
import { signUp } from '../../services/AuthService';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpFormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
    remember: new FormControl(false)
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async onSubmit()
  {
    if(this.signUpFormGroup.valid)
    {
      const user: User = {firstName: this.firstname.value!, lastName: this.lastname.value!, userName: this.username.value!, email: this.email.value!, password: this.password.value!}
      const result = await signUp(user);
      this.router.navigate(["/sign-in"]);

    }

  }

  get email() {
    return this.signUpFormGroup.controls.email;
  }

  get password() {
    return this.signUpFormGroup.controls.password;
  }

  get firstname() {
    return this.signUpFormGroup.controls.firstname;
  }

  get lastname() {
    return this.signUpFormGroup.controls.lastname;
  }

  get username() {
    return this.signUpFormGroup.controls.password;
  }



}
