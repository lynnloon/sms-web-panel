import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Semester } from 'src/app/model/semester';
import { SemesterService } from 'src/app/service/semester.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-create-semester',
  templateUrl: './create-semester.component.html',
  styleUrls: ['./create-semester.component.css']
})
export class CreateSemesterComponent implements OnInit {
  editSemester: boolean = false;
  semester: Semester = new Semester();
  constructor(
    private semesterService: SemesterService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      const semesterid = params['id'];
      if (semesterid) {
        this.editSemester = true;
        this.getById(semesterid)
      }

    });
  }

  getById(id: any) {
    this.semesterService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.semester = response.data;
      } else {
        window.alert('no record found');
      }
    });
  }

  save() {
    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message, 'warning');
    else {
      this.semesterService.create(this.semester).subscribe((response: any) => {
        if (response.status) {
          this.commonService.inputAlert(message, 'success');
          this.router.navigate(['/semester-list']);
        }
      });
    }
  }

  checkValidation(): string {
    if (this.semester.semesterName == undefined || this.semester.semesterName.trim() == '')
      return "Fill Semester name";
    else if (this.semester.semStartDate == undefined )
      return "Fill Start Date";
    else if (this.semester.semEndDate == undefined)
      return "Fill End Date";
    else
      return "OK";
  }
}
