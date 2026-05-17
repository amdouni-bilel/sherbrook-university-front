import { Component, OnInit } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { TeacherModel } from '../../models/teacher.model';
import { TeacherService } from '../../service/teacher.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    MatIcon,
    MatDrawerContainer,
    MatTooltip,
    NgForOf,
    NgIf,
    RouterLink,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent implements OnInit {
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
        console.log('Professeurs chargés :', this.teachers);
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
