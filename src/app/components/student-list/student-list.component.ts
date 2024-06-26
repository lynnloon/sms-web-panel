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

student: Student= new Student();

students: Student[]=[]

constructor(
  private studentService: StudentService
){}


  ngOnInit(): void {
   this.getAllStudentList();
  }


  getAllStudentList() {
    this.studentService.getAllStudentList().subscribe((response: any) => {
      if (response.status) {
        this.students= response.data;
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
        this.studentService.delete(id).subscribe((response: any) => {
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
