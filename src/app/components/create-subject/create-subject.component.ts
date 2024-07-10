import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicBatch } from 'src/app/model/academic-batch';
import { Semester } from 'src/app/model/semester';
import { Subject } from 'src/app/model/subject';
import { SemesterService } from 'src/app/service/semester.service';
import { SubjectService } from 'src/app/service/subject.service';
import { CommonService } from 'src/app/util/common.service';


@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  editSubject?: boolean = false;

  subject: Subject = new Subject();
  batch: AcademicBatch = new AcademicBatch();
  semester: Semester = new Semester();

  batches: AcademicBatch[] = [];
  semesters: Semester[] = [];

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private semesterService: SemesterService,
  ) { }


  ngOnInit() {
    this.getAllAcademicBatchList();
    this.getAllSemester();
    this.activatedRoute.params.subscribe(params => {
      const subjectid = params['id'];
      if (subjectid) {
        this.editSubject = true;
        this.getById(subjectid);
      }
    });
  }

  getById(id: any) {
    this.subjectService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.subject = response.data;
        const selectedBatch = this.batches.find(u => u.id === this.subject.subjectBatch?.id);
        if (selectedBatch) {
          this.batch = selectedBatch;
        }
        const selectedSem = this.semesters.find(u => u.id === this.subject.subjectSem?.id);
        if (selectedSem) {
          this.semester = selectedSem;
        }
      }
      else
        window.alert("No record data")
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
    this.subject.subjectBatch = (this.batch);
    this.subject.subjectSem = (this.semester);
  }

  save() {
    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message, "warning");
    else {
      if (this.editSubject) {
        this.subjectService.update(this.subject).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/subject-list']);
          }
        });
      }
      else {
        this.subjectService.create(this.subject).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, "success");
            this.router.navigate(['/subject-list']);
          }
        });
      }

    }
  }
  checkValidation() {
    if (this.subject.name == undefined || this.subject.name.trim() == "")
      return "Fill subject name"
    else
      return "OK"
  }

}
