export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    department?: string;
    grade?: string;
    createdAt: string;
    updatedAt: string;
}