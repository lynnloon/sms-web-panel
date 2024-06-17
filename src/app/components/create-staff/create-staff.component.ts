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

  editStaff?: boolean = false;
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
          this.router.navigate(['/staff-list']);
        }
      });
    }
  }

  checkValidation(): string {
    if (this.staff.staffName == undefined && this.staff.staffPhoneNo == undefined &&
      this.staff.staffAddress == undefined && this.staff.staffGender == undefined && this.staff.staffEmail == undefined
      && this.staff.staffNrcNo == undefined && this.staff.staffPosition == undefined
      && this.staff.staffProfilePicture == undefined
    )
      return "Fill All Staff Data Please";
    else if (this.staff.staffName == undefined || this.staff.staffName.trim() == '')
      return "Fill Staff name please! ";
    else if (this.staff.staffPhoneNo == undefined || this.staff.staffPhoneNo.trim() == '')
      return "Fill phone no please!";
    else if (this.staff.staffAddress == undefined || this.staff.staffAddress.trim() == '')
      return "Fill address please!";
    else if (this.staff.staffEmail == undefined || this.staff.staffEmail.trim() == '')
      return "Fill email please!";
    else if (this.staff.staffNrcNo == undefined || this.staff.staffNrcNo.trim() == '')
      return "Fill NrcNo Please!";
    else if (this.staff.staffGender == undefined || this.staff.staffGender.trim() == '')
      return "Fill Gender Please!";
    else if (this.staff.staffPosition == undefined || this.staff.staffPosition.trim() == '')
      return "Fill Position Please!";
    else if (this.staff.staffProfilePicture == undefined || this.staff.staffProfilePicture.trim() == '')
      return "Fill ProfilePicture";
    else
      return "OK";
  }

}
