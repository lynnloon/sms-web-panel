import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/model/department';
import { Position } from 'src/app/model/position';
import { Staff } from 'src/app/model/staff';
import { DepartmentService } from 'src/app/service/department.service';
import { PositionService } from 'src/app/service/position.service';
import { StaffService } from 'src/app/service/staff.service';
import { CommonService } from 'src/app/util/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  editStaff?: boolean = false;  
  form !: FormGroup;
  filepath !: string;

  staff: Staff = new Staff();  
  position: Position = new Position();  
  department: Department = new Department();
  
  positions: Position[] = [];
  staffs: Staff[] = [];
  departments: Department[] = [];


  constructor(
    private positionService: PositionService,
    private staffService: StaffService,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getAllPositionList();
    this.getAllDepartmentList();
    this.activatedRoute.params.subscribe(params => {
      const staffid = params['id'];
      if (staffid) {
        this.editStaff = true;
        this.getById(staffid)
      }
    });

    this.form = this.fb.group({
      cover: [null],
    })


  }

  oncoverChange(event: any) {
    const tempfile = event.target.files[0];
    if (tempfile.type == "image/png" || tempfile.type == "image/jpg" || tempfile.type == "image/jpeg") {
      this.form?.patchValue({
        cover: event.target.files[0]
      });
      this.form?.get('cover')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = (x: any) => {
        this.filepath = reader.result as string;
        const img = new Image();
        img.src = x.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 400;
          const maxHeight = 300;

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height >= maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          if (ctx)
            ctx.drawImage(img, 0, 0, width, height);

          this.filepath = canvas.toDataURL(tempfile.type);
          this.saveFile();
        }
      }
      reader.readAsDataURL(tempfile);
    }
    else {
      event.target.value = null;
      Swal.fire("Please add only image-types");

    }
  }

  saveFile() {
    var formData: any = new FormData();
    formData.append('uploadFile', this.form?.get('cover')?.value);
    //formData.append('multipartFile', this.form?.get('cover')?.value);
    this.staffService.filesave(formData).subscribe({
      next: (response: any) => {
        if (response) {
          this.staff.staffProfilePicture = response.data;
        } else {
          this.commonService.inputAlert(response.message, "warning");
        }
      },
      error: (err: any) => {
        Swal.fire("Please Choose image file");
      }
    });
  }

  getAllPositionList() {
    this.positionService.getAllPositionList().subscribe((response: any) => {
      if (response.status) {
        this.positions = response.data;
      }
    });
  }

  getAllDepartmentList() {
    this.departmentService.getAllDepartmentList().subscribe((response: any) => {
      if (response.status) {
        this.departments = response.data;
      }
    });
  }

  getById(id: any) {
    this.staffService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.staff = response.data;
        const selectedDept = this.departments.find(u => u.id === this.staff.staffDepartment?.id);
        if (selectedDept) {
          this.department = selectedDept;
        }
        this.filepath = this.commonService.apiRoute + this.staff.staffProfilePicture;
        const selectedPos = this.positions.find(u => u.id === this.staff.staffPosition?.id);

        if (selectedPos) {
          this.position = selectedPos;
        }

      } else {
        window.alert('no record found');
      }
    });
  }

  save() {

    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message, 'warning');
    else {
      if (this.editStaff) {
        this.staffService.update(this.staff).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/staff-list']);
          }
        });
      } else {
        this.staffService.create(this.staff).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/staff-list']);
          }
        });
      }

    }
  }

  checkValidation(): string {
    if (this.staff.staffName == undefined || this.staff.staffName.trim() == '')
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
    // else if (this.staff.staffPosition == undefined || this.staff.staffPosition.trim() == '')
    //   return "Fill Position Please!";
    // else if (this.staff.staffProfilePicture == undefined )
    //   return "Upload ProfilePicture Please!";
    else
      return "OK";
  }

  onChangeCombo() {
    this.staff.staffPosition = (this.position);
    this.staff.staffDepartment = (this.department);
  }

}
