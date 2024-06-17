import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  editDepartment?: boolean = false;

  department: Department = new Department();

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      const departmentid=params['id'];
      if(departmentid){
        this.editDepartment=true;
        this.getById(departmentid);
      }
    })

  }

  getById(id:any){
    this.departmentService.getById(id).subscribe((response:any)=>{
      if(response.status)
        this.department=response.data;
      else
      window.alert("No record data")
    });
  }



  save() {
    var message = this.checkValidation();
    if (message != 'OK')
      window.alert(message);
    else {
      this.departmentService.create(this.department).subscribe((response: any) => {
        if (response.status) {
          window.alert(response.message);
          this.router.navigate(['/department-list']);
        }
      });
    }

  }




  checkValidation(): string {
    if (this.department.name == undefined || this.department.name.trim() == "")
      return "Fill Department name"
    else
      return "OK"
  }

}
