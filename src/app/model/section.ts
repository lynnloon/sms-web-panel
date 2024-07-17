import { AcademicBatch } from "./academic-batch";
import { Student } from "./student";

export class Section {
    id?: number;
    creationDate?: Date;
    modifyDate?: Date;
    activeStatus?: string;
    name?: string;
    major?: String;
    noOfStudent?:number;
    academicBatch?: AcademicBatch = new AcademicBatch();
    students?: Student[] = [];
}
