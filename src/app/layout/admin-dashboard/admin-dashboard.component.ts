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
import { Chart } from 'chart.js';
import { AcademicBatch } from 'src/app/model/academic-batch';
import { AcademicBatchService } from 'src/app/service/academic-batch.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  batch: AcademicBatch = new AcademicBatch();


  students: Student[] = [];
  staffs: Staff[] = [];
  departments: Department[] = [];
  subjects: Subject[] = [];
  notices: Notice[] = [];
  batches: AcademicBatch[] = [];


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

  staff_count: number[] = [];

  constructor(
    public studentService: StudentService,
    public staffService: StaffService,
    public departmentService: DepartmentService,
    public subjectService: SubjectService,
    private noticeSer: NoticeService,
    public commonService: CommonService,
    private academicBatchSer: AcademicBatchService,
  ) { }
  ngOnInit() {
    this.getStudentList();
    this.getAllNoti();
    this.getSubjects();
    this.getStudentList();
    this.getDepartments();
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


  getAllNoti() {
    this.noticeSer.getAll().subscribe((response: any) => {
      if (response.status) {
        this.notices = response.data;
        this.notices = this.notices.slice(Math.max(this.notices.length - 9, 0));
        this.notices.sort((a, b) => {
          return (b.id ?? Number.MIN_SAFE_INTEGER) - (a.id ?? Number.MIN_SAFE_INTEGER);
        });
      }
    });
  }


  getDepartments() {
    this.departmentService.getAllDepartmentList().subscribe((response: any) => {
      if (response.status) {
        this.departments = response.data;
        this.getTeachers();
      }
    });

  }

  getSubjects() {
    this.subjectService.getAllSubjectList().subscribe((response: any) => {
      if (response.status) {
        this.subjects = response.data;
      }
    });
  }

  getTeachers() {
    this.staffService.getAllStaffList().subscribe((response: any) => {
      if (response.status) {
        this.staffs = response.data;
        this.staff_count = new Array(this.staffs.length).fill(0);
        for (let staff of this.staffs) {
          switch (staff.staffDepartment?.id) {
            case 1:
              this.staff_count[0]++;
              break;
            case 2:
              this.staff_count[1]++;
              break;
            case 3:
              this.staff_count[2]++;
              break;
            case 4:
              this.staff_count[3]++;
              break;
            case 5:
              this.staff_count[4]++;
              break;
            case 6:
              this.staff_count[5]++;
              break;
            case 7:
              this.staff_count[6]++;
              break;
            case 8:
              this.staff_count[7]++;
              break;

          }
        }
        this.renderChart();

      }
    });
  }

  renderChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.departments.map(department => department.name),
        datasets: [{
          label: 'Teacher counts by Departments',
          data: this.staff_count,
          backgroundColor: [
            '#CFECEC',
            '#BCC6CC',
            '#DBE9FA',
            '#D5D6EA',
            '#CCFFFF',
            'rgba(255, 159, 64, 0.2)',
            'rgba(128, 177, 211, 0.2)',
            'rgba(210, 180, 140, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 100, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
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
        },
      },
    });
  }



}
