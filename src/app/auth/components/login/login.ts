import { Component, inject, OnInit } from '@angular/core';
import { AuthS } from '../../services/auth-s';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private readonly params: ActivatedRoute = inject(ActivatedRoute)
  private readonly location = inject(Location);
  private readonly authS = inject(AuthS);
  private readonly router = inject(Router);

  notif!: string
  authForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.notif = this.params.snapshot?.queryParams['message'] ?? null
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      console.log('Formulaire invalide');
      this.markFormGroupAsTouched();
      return;
    }

    const credentials = {
      username: this.authForm.value.username,
      password: this.authForm.value.password,
    };

    this.authS.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
      }
    });
  }

  // Méthode pour marquer tous les champs comme touchés
  private markFormGroupAsTouched(): void {
    Object.keys(this.authForm.controls).forEach((key) => {
      const control = this.authForm.get(key);
      control?.markAsTouched();
    });
  }

    isFieldInvalid(fieldName: string): boolean {
      const field = this.authForm.get(fieldName);
      return !!(field && field.invalid && field.touched);
    }

  getFieldError(fieldName: string): string | null {
    const control = this.authForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    }
    return null;
  }

  goBack(){
    this.location.back();
  }
}
