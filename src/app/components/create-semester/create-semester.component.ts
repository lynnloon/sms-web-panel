import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Semester } from 'src/app/model/semester';
import { SemesterService } from 'src/app/service/semester.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-semester',
  templateUrl: './create-semester.component.html',
  styleUrls: ['./create-semester.component.css']
})
export class CreateSemesterComponent implements OnInit{
  editSemester:boolean=false;
  semester:Semester=new Semester();
  constructor(
    private semesterService:SemesterService,
    private activedRoute:ActivatedRoute,
    private router:Router
  ){}
  
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
      Swal.fire({
        title: "something went wrong",
        text: message,
        icon: "error"
      });
    else {
      this.semesterService.create(this.semester).subscribe((response: any) => {
        if (response.status) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/semester-list']);
        }
      });
    }
  }

  checkValidation(): string {
    if(this.semester.semesterName == undefined && this.semester.semStartDate == undefined
      && this.semester.semEndDate == undefined
    )
    return "Fill All Semester Data please!";

    else if (this.semester.semesterName == undefined || this.semester.semesterName.trim() == '')
      return "Fill Semester name";
    else if (this.semester.semStartDate == undefined || this.semester.semStartDate.trim() == '')
      return "Fill Start Date";
    else if (this.semester.semEndDate == undefined || this.semester.semEndDate.trim() == '')
      return "Fill End Date";
    else
      return "OK";
  }
}
