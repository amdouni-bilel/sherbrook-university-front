import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeacherModel } from "../models/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl: string = 'http://localhost:8080/api/teachers';

  constructor(private http: HttpClient) {}

  // Récupérer tous les professeurs
  getAllTeachers(): Observable<TeacherModel[]> {
    return this.http.get<TeacherModel[]>(this.apiUrl);
  }

  // Récupérer un seul professeur par ID
  getTeacherById(id: number): Observable<TeacherModel> {
    return this.http.get<TeacherModel>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un professeur
  addTeacher(teacher: Partial<TeacherModel>): Observable<TeacherModel> {
    return this.http.post<TeacherModel>(this.apiUrl, teacher);
  }

  // Mettre à jour un professeur
  updateTeacher(id: number, teacher: Partial<TeacherModel>): Observable<TeacherModel> {
    return this.http.put<TeacherModel>(`${this.apiUrl}/${id}`, teacher);
  }

  // Supprimer un professeur
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

