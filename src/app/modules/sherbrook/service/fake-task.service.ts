import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class FakeTaskService {
  private tasks: TaskModel[] = [
    {
      id: 1,
      title: 'Corriger les devoirs',
      description: 'Corriger les devoirs de classe de maths du groupe 101',
      status: 'En cours',
      createdAt: '2026-05-10',
      updatedAt: '2026-05-12'
    },
    {
      id: 2,
      title: 'Préparer l\'exam',
      description: 'Préparer les questions d\'examen final de physique',
      status: 'En attente',
      createdAt: '2026-05-09',
      updatedAt: '2026-05-11'
    },
    {
      id: 3,
      title: 'Mettre à jour les notes',
      description: 'Mettre à jour les notes dans le système de gestion',
      status: 'Complété',
      createdAt: '2026-05-08',
      updatedAt: '2026-05-12'
    },
    {
      id: 4,
      title: 'Préparer le cours',
      description: 'Préparer les supports de cours pour le chapitre 5 de chimie',
      status: 'En cours',
      createdAt: '2026-05-07',
      updatedAt: '2026-05-12'
    },
    {
      id: 5,
      title: 'Réunion pédagogique',
      description: 'Participer à la réunion pédagogique de fin d\'année',
      status: 'En attente',
      createdAt: '2026-05-06',
      updatedAt: '2026-05-12'
    }
  ];

  private tasksSubject = new BehaviorSubject<TaskModel[]>(this.tasks);

  constructor() {}

  getTasks(): Observable<TaskModel[]> {
    return this.tasksSubject.asObservable();
  }

  getTaskById(id: number): TaskModel | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: Omit<TaskModel, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newTask: TaskModel = {
      ...task,
      id: this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  updateTask(id: number, task: Partial<TaskModel>): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        ...task,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      this.tasksSubject.next(this.tasks);
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }
}

