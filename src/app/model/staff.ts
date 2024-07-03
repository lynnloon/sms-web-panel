import { Department } from "./department";
import { Position } from "./position";

export class Staff {
    id?: number;
    staffName?: string;
    staffPhoneNo?: string;
    staffEmail?: string;
    staffGender?: string;
    staffNrcNo?: string;
    staffAddress?: string;
    staffPosition?: Position = new Position();
    staffDepartment?: Department = new Department();
    staffProfilePicture?: string;
    modifyDate?: string;
    creationDate?: string;
    activeStatus?: string;
}
