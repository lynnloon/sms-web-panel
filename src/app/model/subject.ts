import { AcademicBatch } from "./academic-batch";
import { Semester } from "./semester";
import { Staff } from "./staff";

export class Subject {
    id?: number;
    creationDate?: Date;
    modifyDate?: Date;
    activeStatus?: string;
    name?: string;
    moduleNo?: string;
    major?: String;
    subjectBatch?: AcademicBatch = new AcademicBatch();
    subjectSem?: Semester = new Semester();
    subjectStaff?: Staff[]=[];
   
}
