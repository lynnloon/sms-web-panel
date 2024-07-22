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
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { count } from 'rxjs/operators';
import { Timetable } from 'src/app/model/timetable';
import { AcademicYear } from 'src/app/model/academic-year';
import { AcademicService } from 'src/app/service/academic.service';
import { TimetableService } from 'src/app/service/timetable.service';
import { CommonService } from 'src/app/util/common.service';
import { Time } from '@angular/common';
import { Staff } from 'src/app/model/staff';

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
  year: AcademicYear = new AcademicYear();
  student_section: Section = new Section();
  //declaring timetable objects to store records
  timetable: Timetable = new Timetable();
  timetable1: Timetable = new Timetable();
  timetable2: Timetable = new Timetable();
  timetable3: Timetable = new Timetable();
  timetable4: Timetable = new Timetable();
  timetable5: Timetable = new Timetable();
  timetable6: Timetable = new Timetable();
  timetable7: Timetable = new Timetable();
  timetable8: Timetable = new Timetable();
  timetable9: Timetable = new Timetable();
  timetable10: Timetable = new Timetable();
  timetable11: Timetable = new Timetable();
  timetable12: Timetable = new Timetable();
  timetable13: Timetable = new Timetable();
  timetable14: Timetable = new Timetable();
  timetable15: Timetable = new Timetable();
  timetable16: Timetable = new Timetable();
  timetable17: Timetable = new Timetable();
  timetable18: Timetable = new Timetable();
  timetable19: Timetable = new Timetable();
  timetable20: Timetable = new Timetable();
  timetable21: Timetable = new Timetable();
  timetable22: Timetable = new Timetable();
  timetable23: Timetable = new Timetable();
  timetable24: Timetable = new Timetable();
  timetable25: Timetable = new Timetable();
  timetable26: Timetable = new Timetable();
  timetable27: Timetable = new Timetable();
  timetable28: Timetable = new Timetable();
  timetable29: Timetable = new Timetable();
  timetable30: Timetable = new Timetable();

  timetables: Timetable[] = [];
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
    private academicYearSer: AcademicService,
    private timetableService: TimetableService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {

    this.getAllAcademicBatchList();
    this.getAllSemester();

    this.role = localStorage.getItem('userrole') as string;
    this.name = localStorage.getItem('userName') as string;
    this.email = localStorage.getItem('email') as string;

    //retrieving current Academic  
    this.academicYearSer.getCurrent().subscribe((response: any) => {
      if (response.status) {
        if (response.data != null) {
          this.academicYear = response.data.name;
          this.year = response.data;

        }
      }
    });
    if (this.role == "STUDENT") {
      this.studentService.getStudentInfoByEmail(this.email).subscribe((response: any) => {
        if (response.status) {
          this.student = response.data;
          this.academicYear = this.student.stuAcademicYear?.name;
          this.majorN = this.getMajor(this.student.stu_major);
          //batch name
          this.batchId = this.student.studentBatch?.id;
          this.filterDTO.studentId = this.student.id;
          console.log(this.filterDTO.studentId);
          this.academicBatchServie.getById(this.batchId).subscribe((response: any) => {
            if (response.status) {
              this.batch = response.data;
              this.batchName = this.batch.name;
            }

          });
      
          this.filterDTO.batchId=this.batch.id;
          this.filterDTO.semesterId=this.semester.id;
          this.filterDTO.major=this.student.stu_major;
          this.subjectService.getSubByBatch(this.filterDTO).subscribe((response: any) => {
            if (response.status) {
              this.subjects = response.data;
              console.log('I am here>>>>>>>>>>>>', this.subjects);
            }
          });
          this.getSection();
          this.filterDTO.section = this.student_section.id;
          //retrieve timetable list according to section id
          this.timetableService.getTimetableList(this.filterDTO).subscribe((response: any) => {
            if (response.status) {
              this.timetables = response.data;
              for (var i = 0; i < this.timetables.length; i++) {
                if (this.timetables[i].scheduleTime == 1) {
                  this.e11.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 2) {
                  this.e12.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 3) {
                  this.e13.push(this.timetables[i].subject as Subject);

                }
                else if (this.timetables[i].scheduleTime == 4) {
                  this.e14.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 5) {
                  this.e15.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 6) {
                  this.e16.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 7) {
                  this.e21.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 8) {
                  this.e22.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 9) {
                  this.e23.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 10) {
                  this.e24.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 11) {
                  this.e25.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 12) {
                  this.e26.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 13) {
                  this.e31.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 14) {
                  this.e32.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 15) {
                  this.e33.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 16) {
                  this.e34.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 17) {
                  this.e35.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 18) {
                  this.e36.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 19) {
                  this.e41.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 20) {
                  this.e42.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 21) {
                  this.e43.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 22) {
                  this.e44.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 23) {
                  this.e45.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 24) {
                  this.e46.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 25) {
                  this.e51.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 26) {
                  this.e52.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 27) {
                  this.e53.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 28) {
                  this.e54.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 29) {
                  this.e55.push(this.timetables[i].subject as Subject);
                }
                else if (this.timetables[i].scheduleTime == 30) {
                  this.e56.push(this.timetables[i].subject as Subject);
                }
              }
             
            }


          });


        }

      });
    }


  }
  getSection() {
    this.timetableService.getSection(this.filterDTO).subscribe((response: any) => {
      if (response.status) {
        this.student_section = response.data;
        //   console.log(this.student_section.name);
      }

    })
  }

  getMajor(majorName: string | undefined) {

    switch (majorName) {
      case 'CS':
        return 'Computer Science';
      case 'CT':
        return 'Computer Technology';
      case 'CST':
        return 'CST';
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
    this.getSectionList();
    this.show();

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




  //save method for timetable and checking arraylist 's data


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
    //  console.log(" connectedTo  >>>" + event.container.dropped);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.subjects = this.copySubject;

      // transferArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );

    }
  }
  drop1(event: CdkDragDrop<Subject[]>) {

    // console.log(">>>>>>" + event.item);

    if (event.container.data.length > 0) {
      return // this will stop item from drop
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      if (event.previousContainer.id !== event.container.id && event.previousContainer.id == 'cdk-drop-list-31') {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      console.log(">>>>" + this.DecCount());
      console.log(">>>" + this.count);
    }
    // End Drag and drop
  }
  saveTimetable() {

    //assigning data to objects
    if (this.e11[0] != null) {
      this.section.academicBatch = this.batch;
      this.timetable.academicYear = this.year;
      this.timetable.section = this.section;
      this.timetable.subject = this.e11[0];
      this.timetable.teacher_id = 1;
      this.timetable.scheduleTime = 1;
      // this.timetable.section = this.section;
      this.timetables.push(this.timetable);
    }
    //end of assigning data to object
    if (this.e12[0] != null) {
      this.timetable1.academicYear = this.year;
      this.timetable1.section = this.section;
      this.timetable1.subject = this.e12[0];
      this.timetable1.teacher_id = 3;
      this.timetable1.scheduleTime = 2;
      //this.timetable1.section = this.section;
      this.timetables.push(this.timetable1);
    }
    //assigning data to objects
    if (this.e13[0] != null) {
      this.timetable2.subject = this.e13[0];
      this.timetable2.teacher_id = 1;
      this.timetable2.scheduleTime = 3;
      this.timetable2.section = this.section;
      this.timetable2.academicYear = this.year;
      this.timetables.push(this.timetable2);
    }
    // //end of assigning data to object

    // //assigning data to objects
    if (this.e14[0] != null) {
      this.timetable3.subject = this.e14[0];
      this.timetable3.teacher_id = 1;
      this.timetable3.scheduleTime = 4;
      this.timetable3.section = this.section;
      this.timetable3.academicYear = this.year;
      this.timetables.push(this.timetable3);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e15[0] != null) {

      this.timetable4.subject = this.e15[0];
      this.timetable4.teacher_id = 1;
      this.timetable4.scheduleTime = 5;
      this.timetable4.section = this.section;
      this.timetable4.academicYear = this.year;
      this.timetables.push(this.timetable4);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e16[0] != null) {

      this.timetable5.subject = this.e16[0];
      this.timetable5.teacher_id = 1;
      this.timetable5.scheduleTime = 6;
      this.timetable5.section = this.section;
      this.timetable5.academicYear = this.year;
      this.timetables.push(this.timetable5);
    }
    // //end of assigning data to object

    // //assigning data to objects
    if (this.e21[0] != null) {

      this.timetable6.subject = this.e21[0];
      this.timetable6.teacher_id = 1;
      this.timetable6.scheduleTime = 7;
      this.timetable6.section = this.section;
      this.timetable6.academicYear = this.year;
      this.timetables.push(this.timetable6);
    }
    // //end of assigning data to object

    // //assigning data to objects
    if (this.e22[0] != null) {

      this.timetable7.subject = this.e22[0];
      this.timetable7.teacher_id = 1;
      this.timetable7.scheduleTime = 8;
      this.timetable7.section = this.section;
      this.timetable7.academicYear = this.year;
      this.timetables.push(this.timetable7);
    }
    //end of assigning data to object
    //assigning data to objects
    if (this.e23[0] != null) {

      this.timetable8.subject = this.e23[0];
      this.timetable8.teacher_id = 1;
      this.timetable8.scheduleTime = 9;
      this.timetable8.section = this.section;
      this.timetable8.academicYear = this.year;
      this.timetables.push(this.timetable8);
    }
    // //end of assigning data to object

    // //assigning data to objects
    if (this.e24[0] != null) {

      this.timetable9.subject = this.e24[0];
      this.timetable9.teacher_id = 1;
      this.timetable9.scheduleTime = 10;
      this.timetable9.section = this.section;
      this.timetable9.academicYear = this.year;
      this.timetables.push(this.timetable9);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e25[0] != null) {

      this.timetable10.subject = this.e25[0];
      this.timetable10.teacher_id = 1;
      this.timetable10.scheduleTime = 11;
      this.timetable10.section = this.section;
      this.timetable10.academicYear = this.year;
      this.timetables.push(this.timetable10);
    }
    //end of assigning data to object

    //assigning data to objects
    if (this.e26[0] != null) {

      this.timetable11.subject = this.e26[0];
      this.timetable11.teacher_id = 1;
      this.timetable11.scheduleTime = 12;
      this.timetable11.section = this.section;
      this.timetable11.academicYear = this.year;
      this.timetables.push(this.timetable11);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e31[0] != null) {

      this.timetable12.subject = this.e31[0];
      this.timetable12.teacher_id = 1;
      this.timetable12.scheduleTime = 13;
      this.timetable12.section = this.section;
      this.timetable12.academicYear = this.year;
      this.timetables.push(this.timetable12);
    }
    // //end of assigning data to object

    // //assigning data to objects
    if (this.e32[0] != null) {

      this.timetable13.subject = this.e32[0];
      this.timetable13.teacher_id = 1;
      this.timetable13.scheduleTime = 14;
      this.timetable13.section = this.section;
      this.timetable13.academicYear = this.year;
      this.timetables.push(this.timetable13);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e33[0] != null) {

      this.timetable14.subject = this.e33[0];
      this.timetable14.teacher_id = 1;
      this.timetable14.scheduleTime = 15;
      this.timetable14.section = this.section;
      this.timetable14.academicYear = this.year;
      this.timetables.push(this.timetable14);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e34[0] != null) {

      this.timetable15.subject = this.e34[0];
      this.timetable15.teacher_id = 1;
      this.timetable15.scheduleTime = 16;
      this.timetable15.section = this.section;
      this.timetable15.academicYear = this.year;
      this.timetables.push(this.timetable15);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e35[0] != null) {

      this.timetable16.subject = this.e35[0];
      this.timetable16.teacher_id = 1;
      this.timetable16.scheduleTime = 17;
      this.timetable16.section = this.section;
      this.timetable16.academicYear = this.year;
      this.timetables.push(this.timetable16);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e36[0] != null) {

      this.timetable17.subject = this.e36[0];
      this.timetable17.teacher_id = 1;
      this.timetable17.scheduleTime = 18;
      this.timetable17.section = this.section;
      this.timetable17.academicYear = this.year;
      this.timetables.push(this.timetable17);
    }
    //end of assigning data to object


    // //assigning data to objects
    if (this.e41[0] != null) {

      this.timetable18.subject = this.e41[0];
      this.timetable18.teacher_id = 1;
      this.timetable18.scheduleTime = 19;
      this.timetable18.section = this.section;
      this.timetable18.academicYear = this.year;
      this.timetables.push(this.timetable18);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e42[0] != null) {

      this.timetable19.subject = this.e42[0];
      this.timetable19.teacher_id = 1;
      this.timetable19.scheduleTime = 20;
      this.timetable19.section = this.section;
      this.timetable19.academicYear = this.year;
      this.timetables.push(this.timetable19);
    }
    //end of assigning data to object
    //assigning data to objects
    if (this.e43[0] != null) {

      this.timetable20.subject = this.e43[0];
      this.timetable20.teacher_id = 1;
      this.timetable20.scheduleTime = 21;
      this.timetable20.section = this.section;
      this.timetable20.academicYear = this.year;
      this.timetables.push(this.timetable20);
    }
    //end of assigning data to object

    // //assigning data to objects
    if (this.e44[0] != null) {

      this.timetable21.subject = this.e44[0];
      this.timetable21.teacher_id = 1;
      this.timetable21.scheduleTime = 22;
      this.timetable21.section = this.section;
      this.timetable21.academicYear = this.year;
      this.timetables.push(this.timetable21);
    }
    //end of assigning data to object
    //assigning data to objects
    if (this.e45[0] != null) {

      this.timetable22.subject = this.e45[0];
      this.timetable22.teacher_id = 1;
      this.timetable22.scheduleTime = 23;
      this.timetable22.section = this.section;
      this.timetable22.academicYear = this.year;
      this.timetables.push(this.timetable22);
    }
    //end of assigning data to object
    //assigning data to objects
    if (this.e46[0] != null) {

      this.timetable23.subject = this.e46[0];
      this.timetable23.teacher_id = 1;
      this.timetable23.scheduleTime = 24;
      this.timetable23.section = this.section;
      this.timetable23.academicYear = this.year;
      this.timetables.push(this.timetable23);
    }
    //end of assigning data to object
    //assigning data to objects
    if (this.e51[0] != null) {

      this.timetable24.subject = this.e51[0];
      this.timetable24.teacher_id = 1;
      this.timetable24.scheduleTime = 25;
      this.timetable24.section = this.section;
      this.timetable24.academicYear = this.year;
      this.timetables.push(this.timetable24);
    }
    //end of assigning data to object
    //assigning data to objects
    if (this.e52[0] != null) {

      this.timetable25.subject = this.e52[0];
      this.timetable25.teacher_id = 1;
      this.timetable25.scheduleTime = 26;
      this.timetable25.section = this.section;
      this.timetable25.academicYear = this.year;
      this.timetables.push(this.timetable25);
    }
    //end of assigning data to object
    //assigning data to objects
    if (this.e53[0] != null) {

      this.timetable26.subject = this.e53[0];
      this.timetable26.teacher_id = 1;
      this.timetable26.scheduleTime = 27;
      this.timetable26.section = this.section;
      this.timetable26.academicYear = this.year;
      this.timetables.push(this.timetable26);
    }
    // //end of assigning data to object

    // //assigning data to objects
    if (this.e54[0] != null) {

      this.timetable27.subject = this.e54[0];
      this.timetable27.teacher_id = 1;
      this.timetable27.scheduleTime = 28;
      this.timetable27.section = this.section;
      this.timetable27.academicYear = this.year;
      this.timetables.push(this.timetable27);
    }
    // //end of assigning data to object

    // //assigning data to objects
    if (this.e55[0] != null) {

      this.timetable28.subject = this.e55[0];
      this.timetable28.teacher_id = 1;
      this.timetable28.scheduleTime = 29;
      this.timetable28.section = this.section;
      this.timetable28.academicYear = this.year;
      this.timetables.push(this.timetable28);
    }
    // //end of assigning data to object

    // //assigning data to objects
    if (this.e56[0] != null) {

      this.timetable29.subject = this.e56[0];
      this.timetable29.teacher_id = 1;
      this.timetable29.scheduleTime = 30;
      this.timetable29.section = this.section;
      this.timetable29.academicYear = this.year;
      this.timetables.push(this.timetable29);
    }

    //end of assigning data to object


    // for(let i=0;i<=30;i++){
    //   this.timetables[i].scheduleTime=Number(i+1);
    //   this.timetables[i].sections=this.section; 
    //   console.log(" schedule time"+this.timetables[i].scheduleTime);
    //   console.log(" schedule time"+this.timetables[i].scheduleTime)
    // }

    console.log("time table data " + this.timetable.academicYear);
    this.timetableService.save(this.timetables).subscribe((response: any) => {
      if (response.status) {
        this.commonService.inputAlert("Timetable adding complete", 'success');
      }
    });

  }
}
