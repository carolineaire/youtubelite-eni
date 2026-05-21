import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly location: Location = inject(Location);
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]+$/)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit(): void {
    if(this.userForm.valid){
      console.log('Formulaire valide:', this.userForm.value);
    } else {
      console.log('Formulaire invalide');
      this.markFormGroupAsTouched();
    }
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

  getFieldError(fieldName: string): string | null{
    const field = this.userForm.get(fieldName);
    if(field?.errors && field?.touched){
      if(field.errors['required']){
        return `${fieldName} est requis.`;
      }
      if(field.errors['name']){
        return `${fieldName} doit contenir uniquement des lettres et des espaces.`;
      }
      if(field.errors['firstName']){
        return `${fieldName} doit contenir uniquement des lettres et des espaces.`;
      }
      if(field.errors['username']){
        return `${fieldName} doit contenir au moins 3 caractères.`;
      }
      if(field.errors['email']){
        return `${fieldName} n'est pas une adresse email valide.`;
      }
      if(field.errors['password']){
        return `${fieldName} doit contenir au moins 6 caractères.`;
      }
    }
    return null;
  }

  goBack(){
    this.location.back();
  }
}
