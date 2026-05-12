import { Injectable } from '@angular/core';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { users as usersData } from 'app/mock-api/apps/users/data';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class UsersMockApi {
    private _users: any[] = cloneDeep(usersData);

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
        // --------- GET ALL USERS ---------
        this._fuseMockApiService
            .onGet('http://localhost:8080/api/users')
            .reply((() => [200, cloneDeep(this._users)]) as any);

        // --------- GET USER BY ID ---------
        this._fuseMockApiService
            .onGet('http://localhost:8080/api/users/:id')
            .reply((({ urlParams }) => {
                const id = +urlParams.id;
                const user = this._users.find(u => u.id === id);
                return user ? [200, cloneDeep(user)] : [404, null];
            }) as any);

        // --------- ADD USER ---------
        this._fuseMockApiService
            .onPost('http://localhost:8080/api/users')
            .reply((({ request }) => {
                const newUser = {
                    ...request.body,
                    id: Math.max(...this._users.map(u => u.id), 0) + 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                this._users.push(newUser);
                return [200, cloneDeep(newUser)];
            }) as any);

        // --------- UPDATE USER ---------
        this._fuseMockApiService
            .onPut('http://localhost:8080/api/users/:id')
            .reply((({ request, urlParams }) => {
                const id = +urlParams.id;
                const index = this._users.findIndex(u => u.id === id);
                if (index > -1) {
                    this._users[index] = {
                        ...this._users[index],
                        ...request.body,
                        updatedAt: new Date()
                    };
                    return [200, cloneDeep(this._users[index])];
                }
                return [404, null];
            }) as any);

        // --------- DELETE USER ---------
        this._fuseMockApiService
            .onDelete('http://localhost:8080/api/users/:id')
            .reply((({ urlParams }) => {
                const id = +urlParams.id;
                const index = this._users.findIndex(u => u.id === id);
                if (index > -1) {
                    this._users.splice(index, 1);
                    return [200, null];
                }
                return [404, null];
            }) as any);
    }
}

