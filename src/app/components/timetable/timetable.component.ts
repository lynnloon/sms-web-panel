import { Component, OnInit } from '@angular/core';
import { AcademicBatch } from 'src/app/model/academic-batch';
import { Section } from 'src/app/model/section';
import { Semester } from 'src/app/model/semester';
import { SectionService } from 'src/app/service/section.service';
import { SemesterService } from 'src/app/service/semester.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  batch: AcademicBatch = new AcademicBatch();
  batches: AcademicBatch[] = [];
  semester: Semester = new Semester();
  semesters: Semester[] = [];
  section: Section = new Section();
  sections: Section[] = [];
  major: String | undefined;


  constructor(
    private commonService: CommonService,
    private semesterService: SemesterService,
    private sectionService: SectionService,
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
    this.section.academicBatch = new AcademicBatch();
    this.section.academicBatch = (this.batch);
  
  }

  onChange(){
    this.getSectionList();
  }

}
