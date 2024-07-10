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

  subList?: boolean = false;


  constructor(
    private commonService: CommonService,
    private semesterService: SemesterService,
    private sectionService: SectionService,
    public subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.getAllAcademicBatchList();
    this.getAllSemester();



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


