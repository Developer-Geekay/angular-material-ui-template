import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../../services/app/theme.service';
import { CommonModule } from '@angular/common';
import 'iconify-icon';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  themeService: ThemeService = inject(ThemeService);
  loginForm = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
    ]),
  });

  constructor(private router:Router){}

  onSubmit() {
    // console.warn(this.loginForm.value);
    this.router.navigate(["pages"]);
  }
  toggleTheme() {
    this.themeService.updateTheme(!this.themeService.darkMode());
  }
}
