import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TeacherService } from '../../../service/teacher.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

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
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  departments: string[] = [
    'Informatique',
    'Mathématiques',
    'Sciences',
    'Littérature',
    'Histoire',
    'Philosophie',
    'Chimie',
    'Physique',
    'Biologie'
  ];
  statuses: string[] = ['ACTIVE', 'INACTIVE', 'ON_LEAVE'];

  constructor(
      private readonly fb: FormBuilder,
      private readonly teacherService: TeacherService,
      private readonly router: Router,
      private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      speciality: ['', Validators.required],
      birthday: ['', Validators.required],
      grade: ['', Validators.required],
      department: ['', Validators.required],
      adress: ['', Validators.required],
      status: ['ACTIVE', Validators.required]
    });
  }

  save(): void {
    if (this.teacherForm.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'Fermer', { duration: 3000 });
      return;
    }

    const teacherData = {
      ...this.teacherForm.value,
      role: 'TEACHER'
    };

    this.teacherService.addTeacher(teacherData).subscribe({
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
    this.teacherForm.reset({'status': 'ACTIVE'});
  }
}
