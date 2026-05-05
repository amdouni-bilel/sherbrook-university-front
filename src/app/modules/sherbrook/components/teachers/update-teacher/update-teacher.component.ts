import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TeacherService} from '../../../service/teacher.service';

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
        MatIconModule
    ],
    templateUrl: './update-teacher.component.html',
    styleUrl: './update-teacher.component.scss'
})
export class UpdateTeacherComponent implements OnInit {
    teacherForm!: FormGroup;
    teacherId!: number;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private teacherService: TeacherService,
        private router: Router
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
        this.teacherService.getTeacherById(this.teacherId).subscribe(teacher => {
            this.teacherForm.patchValue({
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                phone: teacher.phone,
                department: teacher.department
            });
        });
    }

    reset(): void {
        this.teacherService.getTeacherById(this.teacherId).subscribe(teacher => {
            this.teacherForm.patchValue({
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                email: teacher.email,
                phone: teacher.phone,
                department: teacher.department
            });
        });
    }

    save(): void {
        if (this.teacherForm.valid) {
            this.teacherService.updateTeacher(this.teacherId, this.teacherForm.value).subscribe(() => {
                this.router.navigate(['/list-teachers']);
            });
        }
    }
}

