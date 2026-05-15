import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgForOf, NgIf } from "@angular/common";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatDrawerContainer } from "@angular/material/sidenav";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { TaskModel } from "../../../models/task.model";
import { FakeTaskService } from "../../../service/fake-task.service";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
    selector: 'app-list-tasks',
    standalone: true,
    imports: [
        DatePipe,
        MatButton,
        MatDrawerContainer,
        MatIcon,
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
    templateUrl: './list-tasks.component.html',
    styleUrl: './list-tasks.component.scss'
})
export class ListTasksComponent implements OnInit {
    tasks: TaskModel[] = [];
    loading: boolean = false;
    error: string | null = null;

    constructor(private readonly fakeTaskService: FakeTaskService) {}

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.fakeTaskService.getTasks().subscribe({
            next: (tasks) => {
                this.tasks = tasks;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Erreur lors du chargement des tâches';
                this.loading = false;
                console.error(err);
            }
        });
    }

    deleteTask(taskId: number): void {
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
        if (confirmDelete) {
            this.fakeTaskService.deleteTask(taskId);
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        }
    }

}