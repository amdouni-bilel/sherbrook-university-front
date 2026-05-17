import { Component } from '@angular/core';
import {DatePipe, NgClass, NgFor, NgIf} from '@angular/common';

interface Task {
    id: number;
    title: string;
    description: string;
    assignedTo: string;
    deadline: Date;
    status: string;
    createdAt: Date;
}

@Component({
    selector: 'app-list-tasks',
    standalone: true,
    imports: [DatePipe, NgFor, NgClass], // ⚠️ ajoute NgFor et NgIf pour *ngFor / *ngIf
    templateUrl: './list-tasks.component.html',
    styleUrls: ['./list-tasks.component.scss'] // ⚠️ corrige styleUrl → styleUrls
})
export class ListTasksComponent {

    tasks: Task[] = [
        {
            id: 1,
            title: 'Préparer le cours',
            description: 'Chapitre 3 - Algèbre',
            assignedTo: 'Jean Dupont',
            deadline: new Date('2026-05-20'),
            status: 'En cours',
            createdAt: new Date('2026-05-10')
        },
        {
            id: 2,
            title: 'Corriger les examens',
            description: 'Mathématiques - Session printemps',
            assignedTo: 'Marie Martin',
            deadline: new Date('2026-05-25'),
            status: 'Terminée',
            createdAt: new Date('2026-05-01')
        },
        {
            id: 3,
            title: 'Préparer conférence',
            description: 'Séminaire en informatique',
            assignedTo: 'Pierre Bernard',
            deadline: new Date('2026-05-15'),
            status: 'En retard',
            createdAt: new Date('2026-04-28')
        }
    ];

    protected editTask(id: number) {
        console.log('Modifier tâche', id);
        // Navigation ou logique de modification
    }

    protected deleteTask(id: number) {
        console.log('Supprimer tâche', id);
        // Suppression ou appel API
    }
}
