import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/model/subject';
import { AcademicBatch } from 'src/app/model/academic-batch';
import { Section } from 'src/app/model/section';
import { Semester } from 'src/app/model/semester';
import { SectionService } from 'src/app/service/section.service';
import { SemesterService } from 'src/app/service/semester.service';
import { CommonService } from 'src/app/util/common.service';
import { SubjectService } from 'src/app/service/subject.service';
import { FilterDTO } from 'src/app/model/filter-dto';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  batch: AcademicBatch = new AcademicBatch();
  semester: Semester = new Semester();
  section: Section = new Section();
  subject: Subject = new Subject();
  filterDTO: FilterDTO = new FilterDTO();

  batches: AcademicBatch[] = [];
  semesters: Semester[] = [];
  sections: Section[] = [];
  subjects: Subject[] = [];
  student: Student = new Student();
  major: String | undefined;
  subList?: boolean = false;
  role!: string;
  name!: string;
  email?: string;
  batchId?: number | undefined;
  academicYear?: string;
  batchName?: string;
  majorN?: string;

  constructor(
    private commonService: CommonService,
    private semesterService: SemesterService,
    private sectionService: SectionService,
    public subjectService: SubjectService,
    public studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.getAllAcademicBatchList();
    this.getAllSemester();
    this.role = localStorage.getItem('userrole') as string;
    this.name = localStorage.getItem('userName') as string;
    this.email = localStorage.getItem('email') as string;

    if (this.role == "STUDENT") {
      this.studentService.getStudentInfoByEmail(this.email).subscribe((response: any) => {
        if (response.status) {
          this.student = response.data;
          this.academicYear = this.student.stuAcademicYear?.name;
          this.majorN = this.getMajor(this.student.stu_major);

          //batch name
          this.batchId = this.student.studentBatch?.id;
          this.commonService.getById(this.batchId).subscribe((response: any) => {
            if (response.status) {
              this.batch = response.data;
              this.batchName = this.batch.name;
            }

          });

        }
      });
    }
  }

  getMajor(majorName: string | undefined) {

    switch (majorName) {
      case 'CS':
        return 'Computer Science';
      case 'CT':
        return 'Computer Technology';
      case 'CST':
        return 'Computer Science and Technology';
      default:
        return 'Unknown';
    }
  }
  getSectionList() {
    this.sectionService.getSectionList(this.section).subscribe((response: any) => {
      if (response.status) {
        this.sections = response.data;
      }
    });
  }

  getAllAcademicBatchList() {
    this.commonService.getAllAcademicBatchList().subscribe((response: any) => {
      if (response.status) {
        this.batches = response.data;

      }
    });
  }

  getAllSemester() {
    this.semesterService.getAllSemester().subscribe((respone: any) => {
      if (respone.status) {
        this.semesters = respone.data;
      }
    });
  }

  onChangeCombo() {
    this.filterDTO.batchId = this.batch.id;
    this.show();
  }

  onSemesterChange() {
    this.filterDTO.semesterId = this.semester.id;
    this.show();
  }

  onChange() {
    this.getSectionList();
  }

  //show subject list
  show() {
    this.subList = true;
    this.subjectService.getSubByBatch(this.filterDTO).subscribe((response: any) => {
      if (response.status) {
        this.subjects = response.data;
        console.log('I am here>>>>>>>>>>>>',this.subjects);
      }
    });
  }



}


