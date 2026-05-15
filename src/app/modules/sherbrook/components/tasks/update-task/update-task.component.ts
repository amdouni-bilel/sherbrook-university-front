import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FakeTaskService } from '../../../service/fake-task.service';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  statuses: string[] = ['En attente', 'En cours', 'Complété'];
  taskId: number = 0;
  originalTask: any;

  constructor(
      private readonly fb: FormBuilder,
      private readonly route: ActivatedRoute,
      private readonly router: Router,
      private readonly fakeTaskService: FakeTaskService,
      private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.taskId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['En attente', Validators.required]
    });

    this.loadTask();
  }

  loadTask(): void {
    const task = this.fakeTaskService.getTaskById(this.taskId);
    if (task) {
      this.originalTask = task;
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        status: task.status
      });
    } else {
      this.snackBar.open('Tâche non trouvée.', 'Fermer', { duration: 3000 });
      this.router.navigate(['/list-tasks']);
    }
  }

  save(): void {
    if (this.taskForm.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs obligatoires.', 'Fermer', { duration: 3000 });
      return;
    }

    const taskData = this.taskForm.value;
    this.fakeTaskService.updateTask(this.taskId, taskData);
    this.snackBar.open('Tâche modifiée avec succès.', 'Fermer', { duration: 2000 });

    setTimeout(() => {
      this.router.navigate(['/list-tasks']);
    }, 500);
  }

  reset(): void {
    if (this.originalTask) {
      this.taskForm.patchValue({
        title: this.originalTask.title,
        description: this.originalTask.description,
        status: this.originalTask.status
      });
    }
  }
}

