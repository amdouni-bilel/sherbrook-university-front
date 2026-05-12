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
    MatIconModule
  ],
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private teacherService: TeacherService,
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
      return;
    }

    this.teacherService.addTeacher(this.teacherForm.value).subscribe(
        () => {
          this.snackBar.open('Professeur ajouté avec succès.', 'Fermer', { duration: 3000 });
          this.router.navigate(['/list-teachers']);
        },
        (err) => {
          this.snackBar.open('Erreur lors de l’ajout du professeur.', 'Fermer', { duration: 3000 });
          console.error(err);
        }
    ); // ✅ version concise
  }

  reset(): void {
    this.teacherForm.reset();
  }
}
