import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
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

  form !: FormGroup;
  filepath !: string;



  constructor(
    private httpClient:HttpClient,
    private studentService:StudentService,
    private commonService :CommonService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

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


  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      const studentid = params['id'];
      if (studentid) {
        this.editStudent = true;
        this.getById(studentid)
      }

    });
    this.form = this.fb.group({ 

      cover: [null],
    })

  }

  getById(id: any) {
    this.studentService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.student = response.data;
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
      if(this. editStudent){
        this.studentService.update(this.student).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/student-list']);
          }
        });
      }
    else {
      if(this.editStudent){
        this.studentService.update(this.student).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/student-list']);
          }
        });
      }else{
        this.studentService.create(this.student).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/student-list']);
          }
        });
      }
      
    }
  }



} 
 checkValidation() {
  if (this.student.stu_name == undefined || this.student.stu_name?.trim() == '')
    return "Fill student name";
  // else if (this.student.stu_email == undefined || this.student.stu_email.trim() == '')
  //   return "Fill email address";
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
  else
    return "OK";
  }
}
