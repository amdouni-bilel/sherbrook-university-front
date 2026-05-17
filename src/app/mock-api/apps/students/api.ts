import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { students as studentsData } from 'app/mock-api/apps/students/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class StudentsMockApi {
    private _students: any[] = cloneDeep(studentsData);

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // ..................... PUBLIC METHODS ...................

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // --------- GET ALL STUDENTS ---------
        this._fuseMockApiService
            .onGet('http://localhost:8080/api/students')
            .reply(() => [200, cloneDeep(this._students)]);

        // --------- GET STUDENT BY ID ---------
        this._fuseMockApiService
            .onGet('http://localhost:8080/api/students/:id')
            .reply(({ request, urlParams }) => {
                const id = +urlParams.id;
                const student = this._students.find(s => s.id === id);
                return student ? [200, cloneDeep(student)] : [404, null];
            });

        // --------- ADD STUDENT ---------
        this._fuseMockApiService
            .onPost('http://localhost:8080/api/students')
            .reply(({ request }) => {
                const newStudent = {
                    ...request.body,
                    id: Math.max(...this._students.map(s => s.id), 0) + 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                this._students.push(newStudent);
                return [200, cloneDeep(newStudent)];
            });

        // --------- UPDATE STUDENT ---------
        this._fuseMockApiService
            .onPut('http://localhost:8080/api/students/:id')
            .reply(({ request, urlParams }) => {
                const id = +urlParams.id;
                const index = this._students.findIndex(s => s.id === id);
                if (index > -1) {
                    this._students[index] = {
                        ...this._students[index],
                        ...request.body,
                        updatedAt: new Date()
                    };
                    return [200, cloneDeep(this._students[index])];
                }
                return [404, null];
            });

        // --------- DELETE STUDENT ---------
        this._fuseMockApiService
            .onDelete('http://localhost:8080/api/students/:id')
            .reply(({ request, urlParams }) => {
                const id = +urlParams.id;
                const index = this._students.findIndex(s => s.id === id);
                if (index > -1) {
                    this._students.splice(index, 1);
                    return [200, null];
                }
                return [404, null];
            });
    }
}
