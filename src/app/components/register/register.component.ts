import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  faUser = faUser;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showPassword: boolean = false;

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get passwordMismatch() {
    return this.registerForm.hasError('passwordMismatch');
  }

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator });


  role : string = '';
  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRouteData = this.router.routerState.snapshot.root.firstChild?.data;
        this.role = currentRouteData?.['role'] ?? '';
      }
    });
  }


  ngOnInit(): void {
  }



  submitregister() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value ?? '';
      const password = this.registerForm.get('password')?.value ?? '';
      const role : string[] = [this.role];
      this.auth.checkForDuplicateUserEmail(email, password , role);
    } else {
      this.markFormAsTouched();
    }
  }



  private markFormAsTouched() {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }


}