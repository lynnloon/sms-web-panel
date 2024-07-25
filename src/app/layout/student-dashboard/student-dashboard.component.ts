import { Component, OnInit } from '@angular/core';
import { NoticeBoardComponent } from 'src/app/components/notice-board/notice-board.component';
import { AcademicBatch } from 'src/app/model/academic-batch';

import { Department } from 'src/app/model/department';
import { FilterDTO } from 'src/app/model/filter-dto';
import { Notice } from 'src/app/model/notice';
import { Staff } from 'src/app/model/staff';
import { Student } from 'src/app/model/student';
import { Subject } from 'src/app/model/subject';
import { AcademicBatchService } from 'src/app/service/academic-batch.service';
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
  academicBatch?:string;

  student: Student = new Student();
  notice: Notice = new Notice();
  announcement: Notice = new Notice();
  health: Notice = new Notice();
  school: Notice = new Notice();
  event: Notice = new Notice();
  filterDto: FilterDTO = new FilterDTO();
  batch: AcademicBatch = new AcademicBatch();


  notices: Notice[] = [];
  events: Notice[] = [];
  announcements: Notice[] = [];
  healths: Notice[] = [];
  schools: Notice[] = [];
  subjects: Subject[] = [];
  batches: AcademicBatch[] = [];
  students: Student[] = [];



  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          display: true,
        },
      },
      y: {
        ticks: {
          display: true,
          stepSize: 1
        },
      },
    }
  };


  constructor(
    private noticeService: NoticeService,
    public commonService: CommonService,
    public studentService: StudentService,
    private subjectService: SubjectService,
    private academicBatchSer: AcademicBatchService,
  ) { }

  ngOnInit() {

    this.getStudentList();
    this.email = localStorage.getItem('email') as string;
    this.getAllNotice();
    this.getSubjectForStudent();
  }



  getBatch() {
    this.academicBatchSer.getAllAcademicBatchList().subscribe((response: any) => {
      if (response.status) {
        this.batches = response.data;
        this.calculateCountsByBatch();
        this.barChartLabels = [];
        console.log(this.batches)
        // Extract names from batches and assign to barChartLabels
        this.batches.forEach(batch => {
          return this.barChartLabels.push(batch.name as string);
        });

      }
    });
  }

  getStudentList() {
    this.studentService.getAllStudentList().subscribe((response: any) => {
      if (response.status) {
        this.students = response.data;
        this.getBatch();
      }
    });
  }

  calculateCountsByBatch() {
    // Check if this.batches is defined and has length greater than 0
    if (!this.batches || this.batches.length === 0) {
      console.error('Batches data is not available.');
      return;
    }

    const batchCounts: { [key: string]: { maleCount: number, femaleCount: number } } = {};

    // Initialize batchCounts object with zero counts for each batch
    this.batches.forEach(batch => {
      // Assert batch as AcademicBatch to avoid TypeScript error
      const academicBatch = batch?.name as string;
      batchCounts[academicBatch] = {
        maleCount: 0,
        femaleCount: 0
      };
    });

    // Count males and females for each batch
    this.students.forEach(student => {
      try {
        const batchName = student.studentBatch?.name as string; // Check the property path
        switch (student.stu_gender) {
          case 'Male':
            batchCounts[batchName].maleCount++;
            break;
          case 'Female':
            batchCounts[batchName].femaleCount++;
            break;
          default:
            // Log unexpected genders for debugging
            console.log('Unexpected Gender:', student.stu_gender);
            break;
        }
      } catch (error) {
        console.log('Error counting gender:', error);
      }
    });

    // Prepare barChartData array in the desired format
    this.barChartData = [
      {
        label: 'Female',
        data: Object.keys(batchCounts).map(batchName => batchCounts[batchName].maleCount),
      },
      {
        label: 'Male',
        data: Object.keys(batchCounts).map(batchName => batchCounts[batchName].femaleCount),
      }
    ];

    // Adjust barChartLabels accordingly if needed
    this.barChartLabels = Object.keys(batchCounts);

    console.log(this.barChartData);

  }




  getSubjectForStudent() {
    this.studentService.getStudentInfoByEmail(this.email).subscribe((response: any) => {
      if (response.status) {
        this.student = response.data;
        this.academicBatch = this.student.studentBatch?.name;
        this.filterDto.batchId = this.student.studentBatch?.id;
        this.filterDto.major = this.student.stu_major;
        this.subjectService.getSubByBatch(this.filterDto).subscribe((response: any) => {
          if (response.status) {
            this.subjects = response.data;
          }
        })

      }
    })

  }

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

