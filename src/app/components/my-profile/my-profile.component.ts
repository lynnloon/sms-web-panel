import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'src/app/model/position';
import { Staff } from 'src/app/model/staff';
import { Student } from 'src/app/model/student';
import { PositionService } from 'src/app/service/position.service';
import { StaffService } from 'src/app/service/staff.service';
import { StudentService } from 'src/app/service/student.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  profile!: string;
  name!: string;
  email !: string;
  role!:string;
  pos:any;
  posId:any;
  student: Student = new Student();
  staff: Staff=new Staff();
  position:Position=new Position();





  constructor(
    private commonService: CommonService,
    public studentService: StudentService,
    public staffService: StaffService,
    public positionService:PositionService,
  ) { }

  ngOnInit() {
    this.role=localStorage.getItem('userrole') as string;
    this.name = localStorage.getItem('userName') as string;
    this.profile = localStorage.getItem('profile') as string;
    this.profile = this.commonService.imageURL + this.profile;
    this.email = localStorage.getItem('email') as string;

    if ( this.role== "STUDENT") {
      this.studentService.getStudentInfoByEmail(this.email).subscribe((response: any) => {
        if (response.status) {
          this.student = response.data;
        }
      });
    }
    else if ( this.role == "TEACHER") {
      this.staffService.getStaffInfoByEmail(this.email).subscribe((response: any) => {
        if (response.status) {
          this.staff = response.data;
          this.posId=this.staff.staffPosition?.id;
          this.positionService.getById(this.posId).subscribe((response:any)=>{
            if(response.status){
              this.position=response.data;
              this.pos=this.position.name;
            }
          })


        }
      });
    }
  }

}
