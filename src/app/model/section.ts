import { AcademicBatch } from "./academic-batch";

export class Section {
    id?: number;
    creationDate?: Date;
    modifyDate?: Date;
    activeStatus?: string;
    name?:string;
    academicBatch?:AcademicBatch=new AcademicBatch();

}
