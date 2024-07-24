import { Subject } from "./subject";
import { Schedule } from "./schedule";
import { AcademicYear } from "./academic-year";
import { Section } from "./section";
import { Staff } from "./staff";


export class Timetable {
    id?: number;
    creationDate?: Date;
    modifyDate?: Date;
    activeStatus?: string;
    scheduleTime?: number;
    subject?: Subject = new Subject();
    //teacher?: Staff = new Staff();
    academicYear?: AcademicYear = new AcademicYear();
    section?: Section = new Section();
    semesterId?:number;


}
