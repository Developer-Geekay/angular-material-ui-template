import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemeService } from '../../../services/app/theme.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import 'iconify-icon';
import {
  passwordMatchValidator,
  passwordMisMatchValidator,
} from '../../../validators/custom.validator';
import { AuthService } from '../../../services/auth-google.service';

@Component({
  selector: 'app-login-alternate',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login-alternate.component.html',
  styleUrl: './login-alternate.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginAlternateComponent {
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
    ]),
  });

  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/),
        passwordMisMatchValidator,
      ]),
    }
    // { validators: passwordMatchValidator }
  );

  constructor(private router: Router) {}

  onLoginSubmit() {
    // console.warn(this.loginForm.value);
    this.router.navigate(["pages"]);
  }

  onRegisterSubmit() {
    // console.warn(this.registerForm.value);
    this.router.navigate(["pages"]);
  }

  toggleTheme() {
    this.themeService.updateTheme(!this.themeService.darkMode());
  }

  socialLogin() {
    this.authService.googleLogin();
  }
}
