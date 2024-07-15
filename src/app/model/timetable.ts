import { Subject } from "./subject";
import { Schedule } from "./schedule";
import { AcademicYear } from "./academic-year";


export class Timetable {
    id?: number;
    creationDate?: Date;
    modifyDate?: Date;
    activeStatus?: string;
    scheduleTime?:Schedule=new Schedule();
    subject?:Subject=new Subject();   
    teacher_id?:string;
    acdemicYear?:AcademicYear=new AcademicYear();

}
