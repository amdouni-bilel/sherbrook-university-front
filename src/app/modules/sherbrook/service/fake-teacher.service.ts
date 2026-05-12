import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeacherModel } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class FakeTeacherService {
  private fakeTeachers: TeacherModel[] = [
    {
      id: 1,
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@sherbrooke.ca',
      phone: '+216 22 555 101',
      department: 'Informatique',
      createdAt: '2026-01-15',
      updatedAt: '2026-01-15'
    },
    {
      id: 2,
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@sherbrooke.ca',
      phone: '+216 22 555 102',
      department: 'Mathématiques',
      createdAt: '2026-02-10',
      updatedAt: '2026-02-10'
    },
    {
      id: 3,
      firstName: 'Pierre',
      lastName: 'Bernard',
      email: 'pierre.bernard@sherbrooke.ca',
      phone: '+216 22 555 103',
      department: 'Physique',
      createdAt: '2026-03-05',
      updatedAt: '2026-03-05'
    },
    {
      id: 4,
      firstName: 'Sophie',
      lastName: 'Leclerc',
      email: 'sophie.leclerc@sherbrooke.ca',
      phone: '+216 22 555 104',
      department: 'Chimie',
      createdAt: '2026-03-20',
      updatedAt: '2026-03-20'
    },
    {
      id: 5,
      firstName: 'Jacques',
      lastName: 'Moreau',
      email: 'jacques.moreau@sherbrooke.ca',
      phone: '+216 22 555 105',
      department: 'Biologie',
      createdAt: '2026-04-01',
      updatedAt: '2026-04-01'
    },
    {
      id: 6,
      firstName: 'Ahmed',
      lastName: 'Ben Ali',
      email: 'ahmed.benali@sherbrooke.ca',
      phone: '+216 22 555 110',
      department: 'Informatique',
      createdAt: '2026-04-10',
      updatedAt: '2026-04-10'
    },
    {
      id: 7,
      firstName: 'Fatima',
      lastName: 'Khaled',
      email: 'fatima.khaled@sherbrooke.ca',
      phone: '+216 22 555 111',
      department: 'Mathématiques',
      createdAt: '2026-04-12',
      updatedAt: '2026-04-12'
    },
    {
      id: 8,
      firstName: 'Karim',
      lastName: 'Hassan',
      email: 'karim.hassan@sherbrooke.ca',
      phone: '+216 22 555 112',
      department: 'Physique',
      createdAt: '2026-04-15',
      updatedAt: '2026-04-15'
    },
    {
      id: 9,
      firstName: 'Nadia',
      lastName: 'Saidi',
      email: 'nadia.saidi@sherbrooke.ca',
      phone: '+216 22 555 113',
      department: 'Chimie',
      createdAt: '2026-04-18',
      updatedAt: '2026-04-18'
    },
    {
      id: 10,
      firstName: 'Othman',
      lastName: 'Zaki',
      email: 'othman.zaki@sherbrooke.ca',
      phone: '+216 22 555 114',
      department: 'Biologie',
      createdAt: '2026-04-20',
      updatedAt: '2026-04-20'
    }
  ];

  private teachersSubject = new BehaviorSubject<TeacherModel[]>(this.fakeTeachers);
  teachers$ = this.teachersSubject.asObservable();

  constructor() {}

  getTeachers(): TeacherModel[] {
    return this.fakeTeachers;
  }

  addTeacher(teacher: any): Observable<TeacherModel> {
    return new Observable(observer => {
      setTimeout(() => {
        const newTeacher: TeacherModel = {
          id: Math.max(...this.fakeTeachers.map(t => t.id)) + 1,
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          phone: teacher.tel,
          department: teacher.department,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
        this.fakeTeachers.push(newTeacher);
        this.teachersSubject.next([...this.fakeTeachers]);
        observer.next(newTeacher);
        observer.complete();
      }, 500);
    });
  }

  deleteTeacher(id: number): Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this.fakeTeachers = this.fakeTeachers.filter(t => t.id !== id);
        this.teachersSubject.next([...this.fakeTeachers]);
        observer.next();
        observer.complete();
      }, 500);
    });
  }
}

