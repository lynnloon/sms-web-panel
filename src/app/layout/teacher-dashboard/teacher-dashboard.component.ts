import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/model/department';
import { Notice } from 'src/app/model/notice';
import { Staff } from 'src/app/model/staff';
import { Student } from 'src/app/model/student';
import { Subject } from 'src/app/model/subject';
import { DepartmentService } from 'src/app/service/department.service';
import { NoticeService } from 'src/app/service/notice.service';
import { StaffService } from 'src/app/service/staff.service';
import { StudentService } from 'src/app/service/student.service';
import { SubjectService } from 'src/app/service/subject.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  students: Student[] = [];
  staffs: Staff[] = [];
  departments: Department[] = [];
  subjects: Subject[] = [];
  notices: Notice[] = [];

  constructor(
    public studentService: StudentService,
    public staffService: StaffService,
    public departmentService: DepartmentService,
    public subjectService: SubjectService,
    private noticeSer: NoticeService,
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getAllNoti();
    this.getAllStudentList();
    this.getAllStaffList();
    this.getAllDepartmentList();
    this.getAllSubjectList();
  }
  
  getAllSubjectList() {
    this.subjectService.getAllSubjectList().subscribe((response: any) => {
      if (response.status) {
        this.subjects = response.data;
      }
    });
  }
  getAllDepartmentList() {
    this.departmentService.getAllDepartmentList().subscribe((response: any) => {
      if (response.status) {
        this.departments = response.data;
      }
    });
  }
  getAllStaffList() {
    this.staffService.getAllStaffList().subscribe((response: any) => {
      if (response.status) {
        this.staffs = response.data;
      }
    });
  }
  getAllStudentList() {
    this.studentService.getAllStudentList().subscribe((response: any) => {
      if (response.status) {
        this.students = response.data;
      }
    });
  }
  getAllNoti() {
    this.noticeSer.getAll().subscribe((response: any) => {
      if (response.status) {
        this.notices = response.data;
        this.notices = this.notices.slice(Math.max(this.notices.length - 5, 0));
        this.notices.sort((a, b) => {
          return (b.id ?? Number.MIN_SAFE_INTEGER) - (a.id ?? Number.MIN_SAFE_INTEGER);
        });
      }
    });
  }

}
