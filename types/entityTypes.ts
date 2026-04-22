export interface TeacherDetails{
    id:number;
    address: string;
    classes: string[];
    email?: string;
    bloodType?: string;
    birthday?: Date;
    img: string;
    name: string;
    surname: string;
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
    studentNames: string;
}

export interface SubjectDetails {
    id: number;
    subjectName: string;
    teacherList: string;
}

export interface ClassRoomDetails {
    id: number;
    name: string;
    grade: number;
    capacity: number;
    supervisor: string;
}

export interface LessonDetails {
    id: number;
    className:string;
    subjectName: string;
    teacher: string;
}

export interface ExamDetails{
    id: number;
    date: string;
    className: string;
    subjectName: string;
    teacher: string;
}

export interface AssignmentDetails{
    id:number;
    className:string;
    dueDate: string;
    subjectName: string;
    teacher: string;
}

export interface ResultDetails{
    id: number;
    className: string;
    date: string;
    score: number;
    subjectName: string;
    student:string;
    teacher:string;
}

export interface EventDetails{
    id: number;
    className: string;
    date: string;
    endTime: string;
    startTime: string;
    title: string;
}

export interface AnnouncementDetails{
    id: number;
    title: string;
    date: string;
    className: string;
}