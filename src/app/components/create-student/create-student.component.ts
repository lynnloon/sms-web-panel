import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicYear } from 'src/app/model/academic-year';
import { Student } from 'src/app/model/student';
import { AcademicService } from 'src/app/service/academic.service';
import { FamilyMember } from 'src/app/model/family-member';
import { FamilyMemberService } from 'src/app/service/family-member.service';
import { StudentService } from 'src/app/service/student.service';
import { CommonService } from 'src/app/util/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {



  editStudent?: boolean = false;

  student: Student = new Student();
  year: AcademicYear = new AcademicYear();
  academic?: string;
  years: AcademicYear[] = [];
  father: FamilyMember = new FamilyMember();
  mother: FamilyMember = new FamilyMember();
  emergency: FamilyMember = new FamilyMember();

  form !: FormGroup;
  filepath !: string;
  relation!: string;

  constructor(
    private httpClient: HttpClient,
    private studentService: StudentService,
    private academicService: AcademicService,
    private familyMemberService: FamilyMemberService,
    private commonService: CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.father.relationStatus = "FATHER";
    this.mother.relationStatus = "MOTHER";
    this.getCurrentAcademic();
    this.activatedRoute.params.subscribe(params => {
      const studentid = params['id'];
      if (studentid) {
        this.editStudent = true;
        this.getById(studentid);

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
    this.studentService.filesave(formData).subscribe({
      next: (response: any) => {
        if (response) {
          this.student.stu_pp = response.data;
        } else {
          this.commonService.inputAlert(response.message, "warning");
        }
      },
      error: (err: any) => {
        Swal.fire("Please Choose image file");
      }
    });
  }

  selectOption() {
    if (this.emergency.relationStatus == "FATHER") {
      this.father.guardianStatus = true;
      this.mother.guardianStatus = false;
      this.emergency = this.father;
    }
    else if (this.emergency.relationStatus == "MOTHER") {
      this.mother.guardianStatus = true;
      this.father.guardianStatus = false;
      this.emergency = this.mother;
    }
    else this.emergency.guardianStatus = true;

  }

  getCurrentAcademic() {
    this.academicService.getCurrent().subscribe((response: any) => {
      if (response.status) {
        if (response.data != null) {
          this.academic = response.data.name;
          this.student.stuAcademicYear = response.data;
        }
      }
    });
  }

  getById(id: any) {
    this.studentService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.student = response.data;
        //data binding to parent edit form and emergency form
        if (this.student.familyMembers) {
          for (var i = 0; i < this.student.familyMembers.length; i++) {
            if (this.student.familyMembers[i].relationStatus == "FATHER") {
              this.father = this.student.familyMembers[i];
              if (this.father.guardianStatus)
                this.emergency = this.father;
            }

            else if (this.student.familyMembers[i].relationStatus == "MOTHER") {
              this.mother = this.student.familyMembers[i];
              if (this.mother.guardianStatus)
                this.emergency = this.mother;
            }
            else
              this.emergency = this.student.familyMembers[i];

          }
        }
        this.filepath = this.commonService.apiRoute + this.student.stu_pp;
        // to test academic view
        const selectAcademic = this.years.find(u => u.id === this.student.stuAcademicYear?.id);
        if (selectAcademic) {
          this.year = selectAcademic;
        }
        this.student.stu_dob = this.datePipe.transform(this.student.stu_dob, "yyyy-MM-dd");
      } else {
        window.alert('no record found');
      }
    });
  }

  save() {
    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message, 'warning');
    //editing form when editStudent is true
    else {
      this.student.familyMembers = [];
      this.student.familyMembers.push(this.father);
      this.student.familyMembers.push(this.mother);
      if (!this.father.guardianStatus && !this.mother.guardianStatus)
        this.student.familyMembers.push(this.emergency);
      if (this.editStudent) {
        this.studentService.update(this.student).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/student-list']);
          }
        });

      } else {
        //student create and guardian testing 
        this.studentService.create(this.student).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/student-list']);
          }
        });
      }


    }
  }
  checkValidation() {

    if (this.student.stu_name == undefined || this.student.stu_name?.trim() == '')
      return "Fill student name";
    // else if (this.student.stu_email == undefined || this.student.stu_email.trim() == '')
    //   return "Fill email address";
    else if (this.student.stuRoll_no == undefined || this.student.stuRoll_no.trim() == '')
      return "Fill Roll number";
    else if (this.student.phone_no == undefined || this.student.phone_no.trim() == '')
      return "Fill phone number";
    else if (this.student.stu_currAddress == undefined || this.student.stu_currAddress.trim() == '')
      return "Fill current address";
    else if (this.student.stu_homeAdd == undefined || this.student.stu_homeAdd.trim() == '')
      return "Fill Home address";
    else if (this.student.stu_gender == undefined || this.student.stu_gender.trim() == '')
      return "Fill Your gender";
    else if (this.student.stu_dob == undefined)
      return "Fill Your birth date";
    else if (this.student.stu_nrc == undefined || this.student.stu_nrc.trim() == '')
      return "Fill Your NRC Number";
    else if (this.student.stu_pp == undefined || this.student.stu_pp.trim() == '')
      return "Upload profile picture please";
    else if (this.student.stu_national == undefined || this.student.stu_national.trim() == '')
      return "Fill Your nation";
    else if (this.student.stu_religion == undefined || this.student.stu_religion.trim() == '')
      return "Fill Your religion";
    else if (this.student.stu_relationshipStat == undefined || this.student.stu_relationshipStat.trim() == '')
      return "Fill Your relationship Status";
    else if (this.student.stu_hostel == undefined || this.student.stu_hostel.trim() == '')
      return "Fill Your Hostel Active or Not";
    else if (this.student.stu_ferry == undefined || this.student.stu_ferry.trim() == '')
      return "Fill Ferry Status";

    /* Checking Father Information */
    else if (this.father.name == undefined || this.father.name.trim() == '')
      return "Fill Father's name";
    else if (this.father.nrcNo == undefined || this.father.nrcNo.trim() == '')
      return "Fill Father's Nrc No ";
    else if (this.father.nation == undefined || this.father.nation.trim() == '')
      return "Fill Father's nation";
    else if (this.father.religion == undefined || this.father.religion.trim() == '')
      return "Fill Father's  religion";
    else if (this.father.phoneNo == undefined || this.father.phoneNo.trim() == '')
      return "Fill Father's Phone number";
    else if (this.father.occupation == undefined || this.father.occupation.trim() == '')
      return "Fill Father's occupation";
    /* End of Checking Father Information */
    /* Checking Father Information */

    /* Checking Mother Information */
    else if (this.mother.name == undefined || this.mother.name.trim() == '')
      return "Fill mother's name";
    else if (this.mother.nrcNo == undefined || this.mother.nrcNo.trim() == '')
      return "Fill mother's NRC number";
    else if (this.mother.phoneNo == undefined || this.mother.phoneNo.trim() == '')
      return "Fill mother's Phone number";
    else if (this.mother.occupation == undefined || this.mother.occupation.trim() == '')
      return "Fill mother's occupation";
    else if (this.mother.nation == undefined || this.mother.nation.trim() == '')
      return "Fill mother nation";
    else if (this.mother.religion == undefined || this.mother.religion.trim() == '')
      return "Fill mother religion";
    else if (this.mother.address == undefined || this.mother.address.trim() == '')
      return "Fill mother's address";

    /* End of Checking Mother Information */

    /* Checking other 's information 
    Other may be uncle or anty or sister or other person*/
    else if (this.emergency.name == undefined || this.emergency.name.trim() == '')
      return "Fill Other's name";
    else if (this.emergency.nrcNo == undefined || this.emergency.nrcNo.trim() == '')
      return "Fill Other's Nrc No ";
    else if (this.emergency.nation == undefined || this.emergency.nation.trim() == '')
      return "Fill Other's nation";
    else if (this.emergency.religion == undefined || this.emergency.religion.trim() == '')
      return "Fill Other's  religion";
    else if (this.emergency.phoneNo == undefined || this.emergency.phoneNo.trim() == '')
      return "Fill Other's Phone number";
    else if (this.emergency.occupation == undefined || this.emergency.occupation.trim() == '')
      return "Fill Other's occupation";
    else
      return "OK";
  }

  // getAllAcademicYearList() {

  //   this.academicService.getAllAcademicYear().subscribe((response: any) => {
  //     if (response.status) {
  //       this.years = response.data;
  //     }
  //   });
  // }

  // onChangeCombo() {
  //   this.student.stu_AcademicYear = new AcademicYear();
  //   this.student.stu_AcademicYear = (this.year);

  // }

}
