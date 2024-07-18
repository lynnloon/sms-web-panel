import { Component, OnInit } from '@angular/core';
import { NoticeBoardComponent } from 'src/app/components/notice-board/notice-board.component';

import { Department } from 'src/app/model/department';
import { Notice } from 'src/app/model/notice';
import { Staff } from 'src/app/model/staff';
import { Student } from 'src/app/model/student';
import { Subject } from 'src/app/model/subject';
import { NoticeService } from 'src/app/service/notice.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  notice: Notice = new Notice();
  notices: Notice[] = [];

  event: Notice = new Notice();
  events: Notice[] = [];

  announcement: Notice = new Notice();
  announcements: Notice[] = [];

  health: Notice = new Notice();
  healths: Notice[] = [];

  school: Notice = new Notice();
  schools: Notice[] = [];

  constructor(
    private noticeService: NoticeService
  ) { }
  ngOnInit() {
    this.getAllNotice();
  }
  getAllNotice() {
    this.noticeService.getAll().subscribe((response: any) => {
      if (response.status) {
        this.notices = response.data;
      }
    });
  }

}
