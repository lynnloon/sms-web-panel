import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/service/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subject: Subject = new Subject();
  subjects: Subject[] = []

  constructor(
    private subjectService: SubjectService
  ) { }


  ngOnInit(): void {
    this.getAllSubjectList();
  }

  getAllSubjectList() {
    this.subjectService.getAllSubjectList().subscribe((response: any) => {
      if (response.status) {
        this.subjects = response.data;
      }
    });
  }

  delete(id: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "!!!!!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectService.delete(id).subscribe((response: any) => {
          if (response.status) {
            Swal.fire({
              title: "Deleted!",
              text: "This  record  has been deleted.",
              icon: "success"
            });
            this.ngOnInit();
          }

        });

      }
    });

  }

}
