import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/model/department';
import { Staff } from 'src/app/model/staff';
import { Student } from 'src/app/model/student';
import { Subject } from 'src/app/model/subject';
import { DepartmentService } from 'src/app/service/department.service';
import { StaffService } from 'src/app/service/staff.service';
import { StudentService } from 'src/app/service/student.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  students: Student[] = [];
  staffs: Staff[] = [];
  departments: Department[]=[];
  subjects: Subject[] = [];


  constructor(
    public studentService: StudentService,
    public staffService: StaffService,
    public departmentService:DepartmentService,
    public subjectService: SubjectService,
  ) { }
  ngOnInit() {
    this.studentService.getAllStudentList().subscribe((response: any) => {
      if (response.status) {
        this.students = response.data;
      }
    });

    this.staffService.getAllStaffList().subscribe((response: any) => {
      if (response.status) {
        this.staffs = response.data;
      }
    });

    this.departmentService.getAllDepartmentList().subscribe((response:any)=>{
      if(response.status){
        this.departments=response.data;
      }
    });

    this.subjectService.getAllSubjectList().subscribe((response: any) => {
      if (response.status) {
        this.subjects = response.data;
      }
    });

  }

}
