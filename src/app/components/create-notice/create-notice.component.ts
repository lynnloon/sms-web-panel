import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from 'src/app/model/notice';
import { NoticeService } from 'src/app/service/notice.service';
import { CommonService } from 'src/app/util/common.service';


@Component({
  selector: 'app-create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.css']
})
export class CreateNoticeComponent implements OnInit {

  notice: Notice = new Notice();
  editNotice?: boolean = false;

  constructor(
    private noticeService: NoticeService,
    private commonService: CommonService,
    private router: Router,
    private datePipe: DatePipe,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      const noticeid = params['id'];
      if (noticeid) {
        this.editNotice = true;
        this.getById(noticeid);
      }
    })

  }

  save() {
    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message, 'warning');
    else {
      if (this.editNotice) {
        this.noticeService.update(this.notice).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/notice-board']);
          }
        });
      } else {
        this.noticeService.create(this.notice).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/notice-board']);
          }
        });
      }

    }
  }

  getById(id: any) {
    this.noticeService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.notice = response.data;
        this.decrease(this.notice);
      }
    });
  }

  decrease(notice: Notice) {
    this.noticeService.update(notice).subscribe((response: any) => {
      if (response.status) {
        this.notice = response.data;
      }
    });
  }

  checkValidation() {
    if (this.notice.title == undefined || this.notice.title.trim() == '')
      return "Fill Notice Title";
    else if (this.notice.content == undefined || this.notice.content.trim() == '')
      return "Fill Notice Content Please ";
    // else if (this.notice.creationDate == undefined)
    //   return "Fill Notice Date Please";
    else return "OK";
  }
}
