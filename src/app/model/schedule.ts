import { Time } from "@angular/common";
import { Timestamp } from "rxjs";

export class Schedule {
    id?: number;
    creationDate?: Date;
    modifyDate?: Date;
    activeStatus?: string;
    fromTime?:Time;
    toTime?:Time;
    scheduleDay?:string;

}
