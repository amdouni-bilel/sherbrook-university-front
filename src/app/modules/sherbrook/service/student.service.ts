import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  getAllStudents(): Observable<UserModel[]> {
    return of([
      {
        id: 1,
        firstName: 'Ali',
        lastName: 'Ben Salah',
        email: 'ali@example.com',
        phone: '123456789',
        department: 'Computer Science',
        grade: '2025',
        createdAt: new Date('2024-09-01').toISOString(),
        updatedAt: new Date('2024-05-20').toISOString()
      },
      {
        id: 2,
        firstName: 'Sara',
        lastName: 'Trabelsi',
        email: 'sara@example.com',
        phone: '987654321',
        department: 'Mathematics',
        grade: '2024',
        createdAt: new Date('2024-09-01').toISOString(),
        updatedAt: new Date('2024-05-15').toISOString()
      }
    ]);
  }

  deleteStudent(studentId: number): void {
    // À implémenter avec service réel
  }
}
