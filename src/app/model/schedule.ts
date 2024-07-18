import { Time } from "@angular/common";

export class Schedule {
    id?: number;
    creationDate?: Date;
    modifyDate?: Date;
    activeStatus?: string;
    fromTime?:Time;
    toTime?:Time;
    scheduleDay?:string;

}
