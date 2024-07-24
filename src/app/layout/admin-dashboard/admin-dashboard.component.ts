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
import { Input } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  students: Student[] = [];
  staffs: Staff[] = [];
  departments: Department[] = [];
  subjects: Subject[] = [];
  notices: Notice[] = [];

  public doughnutChartLabels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartOptions: any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
          }
        }
      }
    },
    type: 'doughnut' // Set chart type here
  };

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  staff_count: number[] = [];

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
    this.getSubjects();
    this.getStudentList();
    this.getDepartments();
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

  getStudentList() {
    this.studentService.getAllStudentList().subscribe((response: any) => {
      if (response.status) {
        this.students = response.data;
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
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
