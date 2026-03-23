export interface TeacherDetails{
    id:number;
    address: string;
    classes: string[];
    email?: string;
    img: string;
    name: string;
    phone: string;
    subjects: string[];
    teacherId: string;
}

export interface StudentDetails {
    id: number;
    name: string;
    studentId: string;
    grade: number;
    className: string;
    image: string;
    phone?: string;
    address: string;
}

export interface ParentDetails {
    id: number;
    name: string;
    phone: string;
    address: string;
    email?: string;
    students: string[];
}