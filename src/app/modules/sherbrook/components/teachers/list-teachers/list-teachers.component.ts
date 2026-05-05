import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../../service/teacher.service";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatTooltip} from "@angular/material/tooltip";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {TeacherModel} from "../../../models/teacher.model";
import {RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-teachers',
  standalone: true,
  imports: [
    MatIcon,
    MatDrawerContainer,
    MatTooltip,
    NgForOf,
    NgIf,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './list-teachers.component.html',
  styleUrl: './list-teachers.component.scss'
})
export class ListTeachersComponent implements OnInit{
  teachers: TeacherModel[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private readonly teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.teachers = teachers;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des professeurs';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteTeacher(teacherId: number): void {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?');
    if (confirmDelete) {
      this.teacherService.deleteTeacher(teacherId).subscribe({
        next: () => {
          this.teachers = this.teachers.filter(teacher => teacher.id !== teacherId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
          alert('Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }

}

