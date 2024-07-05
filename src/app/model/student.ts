import { AcademicBatch } from "./academic-batch";
import { AcademicYear } from "./academic-year";
import { FamilyMember } from "./family-member";

export class Student {
    id?: number;
    creationDate?: Date;
    modifyDate?: Date;
    activeStatus?: string;
    stu_name?:string;
    stuRoll_no?:number;
    stu_email?:string;
    phone_no?:string;
    stu_currAddress?:string;
    stu_homeAdd?:string;
    stu_gender?:string;
    stu_dob?:any;
    stu_nrc?:string;
    stu_pp ?:string;
    stu_national?:string;
    stu_religion?:string;
    stu_relationshipStat?:string;
    stu_hostel?:string;
    stu_ferry?:string;
    stu_major ?:string;
    stuAcademicYear?: AcademicYear=new AcademicYear();
    familyMembers ?:FamilyMember[]=[];
    studentBatch?: AcademicBatch=new AcademicBatch();

}
