import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {FakeTeacherService} from '../../../service/fake-teacher.service';

@Component({
    selector: 'app-update-teacher',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatSnackBarModule
    ],
    templateUrl: './update-teacher.component.html',
    styleUrl: './update-teacher.component.scss'
})
export class UpdateTeacherComponent implements OnInit {
    teacherForm!: FormGroup;
    teacherId!: number;
    departments: string[] = ['Informatique', 'Mathématiques', 'Physique', 'Chimie', 'Biologie'];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private fakeTeacherService: FakeTeacherService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit(): void {
        this.teacherForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            department: ['']
        });

        this.teacherId = +this.route.snapshot.paramMap.get('id')!;
        this.loadTeacher();
    }

    loadTeacher(): void {
        const teacher = this.fakeTeacherService.getTeachers().find(t => t.id === this.teacherId);
        if (teacher) {
            this.teacherForm.patchValue({
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                phone: teacher.phone,
                department: teacher.department
            });
        }
    }

    reset(): void {
        this.loadTeacher();
    }

    save(): void {
        if (this.teacherForm.invalid) {
            this.snackBar.open('Veuillez remplir tous les champs obligatoires.', 'Fermer', { duration: 3000 });
            return;
        }

        // Mettre à jour dans les fake données
        const teachers = this.fakeTeacherService.getTeachers();
        const teacherIndex = teachers.findIndex(t => t.id === this.teacherId);
        if (teacherIndex !== -1) {
            teachers[teacherIndex] = {
                ...teachers[teacherIndex],
                ...this.teacherForm.value,
                updatedAt: new Date().toISOString().split('T')[0]
            };
            this.snackBar.open('Professeur modifié avec succès.', 'Fermer', { duration: 2000 });
            setTimeout(() => {
                this.router.navigate(['/list-teachers']);
            }, 500);
        }
    }
}

