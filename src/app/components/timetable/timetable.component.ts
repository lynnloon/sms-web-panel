import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/model/subject';
import { AcademicBatch } from 'src/app/model/academic-batch';
import { Section } from 'src/app/model/section';
import { Semester } from 'src/app/model/semester';
import { SectionService } from 'src/app/service/section.service';
import { SemesterService } from 'src/app/service/semester.service';
import { SubjectService } from 'src/app/service/subject.service';
import { FilterDTO } from 'src/app/model/filter-dto';
import { StudentService } from 'src/app/service/student.service';
import { Student } from 'src/app/model/student';
import { AcademicBatchService } from 'src/app/service/academic-batch.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { count } from 'rxjs/operators';

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
  student: Student = new Student();

  batches: AcademicBatch[] = [];
  semesters: Semester[] = [];
  sections: Section[] = [];
  subjects: Subject[] = [];//subject list to drag
  copySubject: Subject[] = [];//renew subject list

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
    private semesterService: SemesterService,
    private sectionService: SectionService,
    public subjectService: SubjectService,
    public studentService: StudentService,
    private academicBatchServie: AcademicBatchService,
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
          this.academicBatchServie.getById(this.batchId).subscribe((response: any) => {
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
    this.sectionService.getSectionList(this.filterDTO).subscribe((response: any) => {
      if (response.status) {
        this.sections = response.data;
        console.log("section lists>>>" + this.sections);
      }
    });
  }

  getAllAcademicBatchList() {
    this.academicBatchServie.getAllAcademicBatchList().subscribe((response: any) => {
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

  onMajorChange() {
    console.log(this.filterDTO.batchId + "  >>> " + this.filterDTO.major);
    this.getSectionList();
  }


  //show subject list
  show() {
    this.subList = true;
    this.subjectService.getSubByBatch(this.filterDTO).subscribe((response: any) => {
      if (response.status) {
        this.subjects = response.data;
        console.log('I am here>>>>>>>>>>>>', this.subjects);
        this.copySubject = this.subjects;
      }
    });
  }//getting subject list according to academic batch

  // For Drag and drop 

  // people: Subject[] = [
  //   { name: 'Math1', id: 1, type: 1 },
  //   { name: 'Math2', id: 2, type: 1 }];
  // movies: Subject[] = [
  //   { name: 'SE1', id: 1, type: 2 },
  //   { name: 'SE2', id: 2, type: 2 }
  // ];
  // subs: Subject[] = [
  //   { name: 'IAS', id: 1, type: 3 },
  //   { name: 'IAS', id: 2, type: 3 }
  // ];
  // data: Subject[] = [
  //   { name: 'Dadta Mining', id: 1, type: 4 },
  //   { name: 'Dadta Mining', id: 2, type: 4 }
  // ];
  // aa: Subject[] = [
  //   { name: 'Advanced Analysis', id: 1, type: 5 },
  //   { name: 'Advanced Analysis', id: 2, type: 5 }
  // ];
  // erp: Subject[] = [
  //   { name: 'ERP', id: 1, type: 6 },
  //   { name: 'ERP', id: 2, type: 6 }
  // ];

  e11: Subject[] = []; e12: Subject[] = []; e13: Subject[] = []; e14: Subject[] = []; e15: Subject[] = [];
  e16: Subject[] = []; e21: Subject[] = []; e22: Subject[] = []; e23: Subject[] = []; e24: Subject[] = [];
  e25: Subject[] = []; e26: Subject[] = []; e31: Subject[] = []; e32: Subject[] = []; e33: Subject[] = [];
  e34: Subject[] = []; e35: Subject[] = []; e36: Subject[] = []; e41: Subject[] = []; e42: Subject[] = [];
  e43: Subject[] = []; e44: Subject[] = []; e45: Subject[] = []; e46: Subject[] = []; e51: Subject[] = [];
  e52: Subject[] = []; e53: Subject[] = []; e54: Subject[] = []; e55: Subject[] = []; e56: Subject[] = [];
  count?: number = 4;
  dragSubject?: string;
  DecCount() {
    this.count = Number(this.count) - 1;
    return this.count;
  }

  drop(event: CdkDragDrop<Subject[]>) {
    console.log(" connectedTo  >>>" + event.container.dropped);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.subjects = this.copySubject;
      console.log("log>>" + this.DecCount());
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    }
  }
  drop1(event: CdkDragDrop<Subject[]>) {
    console.log(">>>>>>" + event.item);

    if (event.container.data.length > 0) {
      return // this will stop item from drop
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      console.log(">>>>" + this.DecCount());
      console.log(">>>" + this.count);
    }
    // End Drag and drop
  }

}
