import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  profile!: string;
  name!: string;
  email !: string;
  student: Student = new Student();

  rollNo: string | undefined;




  constructor(
    private commonService: CommonService,
    public studentService: StudentService,
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('userName') as string;
    this.profile = localStorage.getItem('profile') as string;
    this.profile = this.commonService.imageURL + this.profile;
    this.email = localStorage.getItem('email') as string;
    this.studentService.getStudentInfoByEmail(this.email).subscribe((response: any) => {
      if (response.status) {
        this.student = response.data;
  }
});
}

}
