import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-lists',
  templateUrl: './department-lists.component.html',
  styleUrls: ['./department-lists.component.css']
})
export class DepartmentListsComponent implements OnInit {

  department: Department = new Department();

  departments: Department[] = []
  role?: string;

  constructor(
    private departmentService: DepartmentService
  ) { }


  ngOnInit() {
    this.role = localStorage.getItem('userrole') as string;
    this.getAllDepartmentList();
  }

  getAllDepartmentList() {
    this.departmentService.getAllDepartmentList().subscribe((response: any) => {
      if (response.status) {
        this.departments = response.data;
      }
    });
  }

  delete(id: any) {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Are you sure to delete this record?.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      position: 'top'
    }).then((result) => {
      if (result.isConfirmed) {
        this.departmentService.delete(id).subscribe((response: any) => {
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
