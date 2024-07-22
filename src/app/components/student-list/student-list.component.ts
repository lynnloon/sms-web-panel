import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  student: Student = new Student();

  students: Student[] = []
  role?: string;





  constructor(
    private studentService: StudentService
  ) { }


  ngOnInit() {
    this.role = localStorage.getItem('userrole') as string;
    this.getAllStudentList();
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


  getAllStudentList() {
    this.studentService.getAllStudentList().subscribe((response: any) => {
      if (response.status) {
        this.students = response.data;
      }
    });
  }


  delete(id: any) {

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

        this.studentService.delete(id).subscribe((response: any) => {
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
