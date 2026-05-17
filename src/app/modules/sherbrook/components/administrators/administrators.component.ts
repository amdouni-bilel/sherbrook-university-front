import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrators.component.html',
  styleUrl: './administrators.component.scss'
})
export class AdministratorsComponent {
  admins = [
    {
      id: 1,
      firstName: 'Amdouni',
      lastName: 'Bilel',
      email: 'amdouni.bilel@company.com',
      phone: '+1 234 567 8900',
      department: 'Informatique',
      grade: 'Doctorat',
      createdAt: 'Mon Jan 01 2024'
    },
    {
      id: 2,
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@company.com',
      phone: '+1 234 567 8901',
      department: 'Mathématiques',
      grade: 'Maîtrise',
      createdAt: 'Sat Feb 10 2024'
    },
    {
      id: 3,
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@company.com',
      phone: '+1 234 567 8902',
      department: 'Sciences',
      grade: 'Doctorat',
      createdAt: 'Tue Mar 05 2024'
    },
    {
      id: 4,
      firstName: 'Pierre',
      lastName: 'Bernard',
      email: 'pierre.bernard@company.com',
      phone: '+1 234 567 8903',
      department: 'Littérature',
      grade: 'Baccalauréat',
      createdAt: 'Sat Jan 20 2024'
    },
    {
      id: 5,
      firstName: 'Sophie',
      lastName: 'Garcia',
      email: 'sophie.garcia@company.com',
      phone: '+1 234 567 8904',
      department: 'Histoire',
      grade: 'Maîtrise',
      createdAt: 'Fri Apr 12 2024'
    }
  ];
}
