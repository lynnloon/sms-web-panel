import { Component, OnInit } from '@angular/core';
import { FilterDTO } from 'src/app/model/filter-dto';
import { Section } from 'src/app/model/section';
import { Staff } from 'src/app/model/staff';
import { Subject } from 'src/app/model/subject';

import { StaffService } from 'src/app/service/staff.service';
import { SubjectService } from 'src/app/service/subject.service';
import { TimetableService } from 'src/app/service/timetable.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
onSectionChange() {
throw new Error('Method not implemented.');
}
  teacher: Staff = new Staff();
  subject: Subject = new Subject();
  filterDto: FilterDTO = new FilterDTO();
  section: Section = new Section();
  subjects: Subject[] = [];
  sections: Section[] = [];
  email?: string;

  constructor(
    private staffService: StaffService,
    private subjectService: SubjectService,
    private timetableService: TimetableService,

  ) { }


  ngOnInit() {
    debugger
    this.email = localStorage.getItem("email") as string;
    this.staffService.getStaffInfoByEmail(this.email).subscribe((response: any) => {
      if (response.status) {
        this.teacher = response.data;
        this.filterDto.teacherId = this.teacher.id;
        this.subjectService.getSubjectByTr(this.filterDto).subscribe((response: any) => {
          if (response.status) {
            this.subjects = response.data;
          }
        });
      }
    });


  }
  onChangeCombo() {
    this.filterDto.subjectId = this.subject.id;
    this.timetableService.getSectionByTr(this.filterDto).subscribe((response: any) => {
      if (response.status) {
        this.sections = response.data;

      }
    })
  }

}
