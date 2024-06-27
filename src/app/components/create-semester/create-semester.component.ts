import { DatePipe } from '@angular/common';
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
    private commonService: CommonService,
    private datepipe:DatePipe
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
        this.semester.semStartDate=this.datepipe.transform(this.semester.semStartDate,"yyyy-MM-dd");
        this.semester.semEndDate=this.datepipe.transform(this.semester.semEndDate,"yyyy-MM-dd");

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
      if(this.editSemester){
        this. semesterService.update(this.semester).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/semester-list']);
          }
        });
      }
    else {
      this.semesterService.create(this.semester).subscribe((response: any) => {
        if (response.status) {
          this.commonService.inputAlert(message, 'success');
          this.router.navigate(['/semester-list']);
        }
      });
    }
  }

  
  }
  checkValidation() {
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
