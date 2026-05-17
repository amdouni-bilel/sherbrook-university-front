import {Component, OnInit} from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatDrawerContainer} from "@angular/material/sidenav";
import {MatTooltip} from "@angular/material/tooltip";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {StudentService} from "../../service/student.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    MatIcon,
    MatDrawerContainer,
    MatTooltip,
    NgForOf,
    NgIf,
    RouterLink,
    CommonModule,
    MatButton
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  students: UserModel[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private readonly studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des étudiants';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteStudent(studentId: number): void {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?');
    if (confirmDelete) {
      this.studentService.deleteStudent(studentId);
      this.students = this.students.filter(student => student.id !== studentId);
    }
  }

}
