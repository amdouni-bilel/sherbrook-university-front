import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FakeTeacherService } from '../../../service/fake-teacher.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  departments: string[] = ['Informatique', 'Mathématiques', 'Physique', 'Chimie', 'Biologie'];

  constructor(
      private fb: FormBuilder,
      private fakeTeacherService: FakeTeacherService,
      private router: Router,
      private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: [''],
      department: ['']
    });
  }

  save(): void {
    if (this.teacherForm.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires.', 'Fermer', { duration: 3000 });
      return;
    }

    const teacherData = this.teacherForm.value;

    this.fakeTeacherService.addTeacher(teacherData).subscribe({
      next: () => {
        this.snackBar.open('Professeur ajouté avec succès.', 'Fermer', { duration: 2000 });
        setTimeout(() => {
          this.router.navigate(['/list-teachers']);
        }, 500);
      },
      error: (err) => {
        this.snackBar.open('Erreur lors de l\'ajout du professeur.', 'Fermer', { duration: 3000 });
        console.error(err);
      }
    });
  }

  reset(): void {
    this.teacherForm.reset();
  }
}
