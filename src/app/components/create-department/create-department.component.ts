import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import { CommonService } from 'src/app/util/common.service';

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
    private activatedRoute: ActivatedRoute,
    private commonService : CommonService
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
      this.commonService.inputAlert(message,'warning')
    else {
      if(this.editDepartment){
        this. departmentService.update(this.department).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/department-list']);
          }
        });
      }
    else {
      this.departmentService.create(this.department).subscribe((response: any) => {
        if (response.status) {
          this.commonService.inputAlert(message,'success')
          this.router.navigate(['/department-list']);
        }else{
          this.commonService.inputAlert(response.message,'error')
        }
      });
    }

  }




}
  checkValidation() {
    if (this.department.name == undefined || this.department.name.trim() == "")
      return "Fill Department name"
    else
      return "OK"
  }
}
