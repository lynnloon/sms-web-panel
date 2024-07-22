import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyMember } from 'src/app/model/family-member';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  student: Student = new Student();

  seeDetails?:boolean=false;

  filepath?:string;

  father: FamilyMember = new FamilyMember();
  mother: FamilyMember = new FamilyMember();
  emergency: FamilyMember = new FamilyMember();

  constructor(
    private commonService: CommonService,
    public studentService: StudentService,
    public activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {
    this.father.relationStatus = "FATHER";
    this.mother.relationStatus = "MOTHER";
    this.activatedRoute.params.subscribe(params => {
      const stuId = params['id'];
      if (stuId) {
        this.seeDetails = true;
        this.getById(stuId);
      }
    });

  }

  getById(id:any){
    this.studentService.getById(id).subscribe((response:any)=>{
      if(response){
        this.student=response.data;
        this.filepath = this.commonService.apiRoute + this.student.stu_pp;
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
      }
    });
  }
}
