import { Component, OnInit } from '@angular/core';
import { Semester } from 'src/app/model/semester';
import { SemesterService } from 'src/app/service/semester.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css']
})
export class SemesterListComponent implements OnInit {

  semester: Semester = new Semester();
  semesters: Semester[] = []

 
  constructor(
    private semesterService: SemesterService
  ) { }

  ngOnInit() {
    this.getAllSemester();
  }
  getAllSemester() {
    this.semesterService.getAllSemester().subscribe((respone: any) => {
      if (respone.status) {
        this.semesters = respone.data;
      }
    });
  }

  delete(id:any) {
    Swal.fire({
      // delete,cancel alert
      title: "Delete Comfirmation",
      text: "Are you sure to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }//end delete,cancel alert
    ).then((result) => {
      if (result.isConfirmed) {

        this.semesterService.delete(id).subscribe((response: any) => {
          if (response.status) {
            Swal.fire({
              title: "Deleted!",
              text: response.message,
              icon: "success"
            });
            this.ngOnInit();
          }
        });
      }
    });
  }
}
