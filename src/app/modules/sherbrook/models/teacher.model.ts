export interface TeacherModel {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    tel: string;
    password?: string;
    role?: string;
    status?: string;
    speciality: string;
    birthday: string;
    grade: number;
    department: string;
    adress: string;
    courses?: any;
    classes?: any;
    createdAt?: string;
    updatedAt?: string;
}
