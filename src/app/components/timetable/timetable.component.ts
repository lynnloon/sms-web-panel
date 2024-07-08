import { Component, OnInit } from '@angular/core';
import { AcademicBatch } from 'src/app/model/academic-batch';
import { Semester } from 'src/app/model/semester';
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

  constructor(
    private commonService: CommonService,
    private semesterService: SemesterService,
  ) { }

  ngOnInit(): void {
    this.getAllAcademicBatchList();
    this.getAllSemester();
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

  // onChangeCombo() {
  //   this.student.studentBatch = new AcademicBatch();
  //   this.student.studentBatch = (this.batch);



  // }

}
