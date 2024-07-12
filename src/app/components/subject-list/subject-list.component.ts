import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/model/subject';
import { AcademicBatchService } from 'src/app/service/academic-batch.service';
import { SubjectService } from 'src/app/service/subject.service';
import { CommonService } from 'src/app/util/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  batchName?: string;

  subject: Subject = new Subject();
  subjects: Subject[] = []

  constructor(
    public subjectService: SubjectService,
    public academicBatchService: AcademicBatchService,
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

  getBatchNumber(batchName: string | undefined): string {
    switch (batchName) {
      case 'FIRST YEAR':
        return '1';
      case 'SECOND YEAR':
        return '2';
      case 'THIRD YEAR':
        return '3';
      case 'FOURTH YEAR':
        return '4';
      case 'FIFTH YEAR':
        return '5'
      case 'MASTER':
        return '6';
      default:
        return 'Unknown';
    }
  }


  delete(id: any) {

    Swal.fire({
      title: "Delete Comfirmation",
      text: "Are you sure to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectService.delete(id).subscribe((response: any) => {
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
