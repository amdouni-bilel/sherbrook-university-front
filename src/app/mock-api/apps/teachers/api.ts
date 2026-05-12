import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { teachers as teachersData } from 'app/mock-api/apps/teachers/data';
import { cloneDeep } from 'lodash-es';
import {HttpRequest} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class TeachersMockApi {
    private _teachers: any[] = cloneDeep(teachersData);

    constructor(private _fuseMockApiService: FuseMockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        // --------- GET TEACHER BY ID ---------
        this._fuseMockApiService
            .onGet('http://localhost:8080/api/teachers/:id')
            .reply(({ request }: { request: HttpRequest<any> }) => {
                const id = Number(request.params.get('id'));   // ✅ utilisation correcte
                const teacher = this._teachers.find(t => t.id === id);

                if (teacher) {
                    return [200, cloneDeep(teacher)] as [number, any]; // ✅ typage explicite
                }

                return [404, null] as [number, any]; // ✅ typage explicite
            });


// --------- UPDATE TEACHER ---------
        this._fuseMockApiService
            .onPut('http://localhost:8080/api/teachers/:id')
            .reply(({ request }: { request: HttpRequest<any> }) => {
                const id = Number(request.params.get('id'));   // ✅ correct
                const index = this._teachers.findIndex(t => t.id === id);

                if (index > -1) {
                    this._teachers[index] = {
                        ...this._teachers[index],
                        ...request.body,
                        updatedAt: new Date()
                    };
                    return [200, cloneDeep(this._teachers[index])] as [number, any]; // ✅ typage explicite
                }

                return [404, null] as [number, any]; // ✅ typage explicite
            });


// --------- DELETE TEACHER ---------
        this._fuseMockApiService
            .onDelete('http://localhost:8080/api/teachers/:id')
            .reply(({request}) => {
                const id = +request.params.get('id');   // ✅ corrigé
                const index = this._teachers.findIndex(t => t.id === id);
                if (index > -1) {
                    this._teachers.splice(index, 1);
                    return [200, null];
                }
                return [404, null];
            });
    }
    }
