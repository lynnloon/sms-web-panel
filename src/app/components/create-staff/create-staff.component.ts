import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from 'src/app/model/staff';
import { StaffService } from 'src/app/service/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  editStaff?: boolean=false;
  staff: Staff = new Staff();

  constructor(
    private staffService: StaffService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const staffid = params['id'];
      if (staffid) {
        this.editStaff = true;
        this.getById(staffid)
      }

    });
  }

  getById(id: any) {
    this.staffService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.staff = response.data;
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
      this.staffService.create(this.staff).subscribe((response: any) => {
        if (response.status) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/user-list']);
        }
      });
    }
  }

  checkValidation(): string {
    
    if (this.staff.staffName == undefined || this.staff.staffName.trim() == '')
      return "Fill user name";
    else if (this.staff.staffPhoneNo == undefined || this.staff.staffPhoneNo.trim() == '')
      return "Fill phone no";
    else if (this.staff.staffAddress == undefined || this.staff.staffAddress.trim() == '')
      return "Fill address";
    else
      return "OK";
  }

}
