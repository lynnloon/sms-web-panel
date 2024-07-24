import { Component, OnInit } from '@angular/core';
import { NoticeBoardComponent } from 'src/app/components/notice-board/notice-board.component';

import { Department } from 'src/app/model/department';
import { FilterDTO } from 'src/app/model/filter-dto';
import { Notice } from 'src/app/model/notice';
import { Staff } from 'src/app/model/staff';
import { Student } from 'src/app/model/student';
import { Subject } from 'src/app/model/subject';
import { NoticeService } from 'src/app/service/notice.service';
import { StudentService } from 'src/app/service/student.service';
import { SubjectService } from 'src/app/service/subject.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  email?: string;

  student: Student = new Student();
  notice: Notice = new Notice();
  announcement: Notice = new Notice();
  health: Notice = new Notice();
  school: Notice = new Notice();
  event: Notice = new Notice();
  filterDto: FilterDTO = new FilterDTO();


  notices: Notice[] = [];
  events: Notice[] = [];
  announcements: Notice[] = [];
  healths: Notice[] = [];
  schools: Notice[] = [];
  subjects: Subject[] = [];


  public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  constructor(
    private noticeService: NoticeService,
    public commonService: CommonService,
    public studentService: StudentService,
    private subjectService: SubjectService,
  ) { }
  ngOnInit() {
    this.email = localStorage.getItem('email') as string;
    this.getAllNotice();
    this.getSubjectForStudent();

    // this.studentInfo();
  }
  getSubjectForStudent() {
    this.studentService.getStudentInfoByEmail(this.email).subscribe((response: any) => {
      if (response.status) {
        this.student=response.data;
        this.filterDto.batchId = this.student.studentBatch?.id;
        this.filterDto.major =this.student.stu_major;
        this.subjectService.getSubByBatch(this.filterDto).subscribe((response: any) => {
          if (response.status) {
            this.subjects = response.data;
          }
        })

      }
    })

  }
  // studentInfo() {
  //   this.studentService.getStudentInfoByEmail(this.email).subscribe((response: any) => {
  //     if (response.status) {
  //       this.student = response.data;
  //     }
  //   });
  // }
  getAllNotice() {
    this.noticeService.getAll().subscribe((response: any) => {
      if (response.status) {
        this.notices = response.data;
        this.onChange();

      }
    });
  }

  onChange() {
    this.notices.sort((a, b) => (b.id ?? Number.MAX_SAFE_INTEGER) - (a.id ?? Number.MAX_SAFE_INTEGER));

    // Iterate through notices and categorize based on title
    for (let notice of this.notices) {
      if (notice.title === 'ANNOUNCEMENT') {
        if (this.announcements.length < 3) {
          this.announcements.push(notice);
        }
      } else if (notice.title === 'EVENT') {
        if (this.events.length < 3) {
          this.events.push(notice);
        }
      } else if (notice.title === 'HEALTH') {
        if (this.healths.length < 3) {
          this.healths.push(notice);
        }
      } else if (notice.title === 'SCHOOL ACTIVITY') {
        if (this.schools.length < 3) {
          this.schools.push(notice);
        }
      }
    }
    // Reverse each list to maintain the correct order (most recent at the end)
    this.announcements.reverse();
    this.events.reverse();
    this.healths.reverse();
    this.schools.reverse();

  }
}
