import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthS } from '../../services/auth-s';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly location = inject(Location);
  private readonly authS = inject(AuthS);
  private readonly router = inject(Router);

  userForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]),
  });

   onSubmit(): void {
    if (this.userForm.invalid) {
      console.log('Formulaire invalide');
      this.markFormGroupAsTouched();
      return;
    }

    const payload = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };

    this.authS.register(payload).subscribe({
      next: (user) => {
        console.log('Utilisateur enregistré:', user);

        this.userForm.reset();
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement:', err);
      }
    });
  }

  // Méthode pour marquer tous les champs comme touchés
  private markFormGroupAsTouched(): void {
    Object.keys(this.userForm.controls).forEach((key) => {
      const control = this.userForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.userForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return `Ce champ est requis.`;
      }
      if (field.errors['minlength']) {
        return `Ce champ est trop court.`;
      }
      if (field.errors['email']) {
        return `Ce champ n'est pas une adresse email valide.`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'password') {
          return `Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.`;
        }
        return `Ce champ contient des caractères invalides.`;
      }
    }
    return null;
  }

  goBack(){
    this.location.back();
  }
}
