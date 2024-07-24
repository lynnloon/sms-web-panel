import { Component, OnInit } from '@angular/core';
import { Notice } from 'src/app/model/notice';
import { NoticeService } from 'src/app/service/notice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css']
})
export class NoticeBoardComponent implements OnInit {

  role?: string;

  notice: Notice = new Notice();

  notices: Notice[] = [];

  constructor(
    private noticeService: NoticeService
  ) { }
  ngOnInit() {
    this.role = localStorage.getItem('userrole') as string;
    this.getAllNotice();
  }
  delete(id: any) {
    Swal.fire({
      title: "Delete Comfirmation",
      text: "Are you sure to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        this.noticeService.delete(id).subscribe((response: any) => {
          if (response.status) {
            Swal.fire({
              title: "Deleted!",
              text: response.message,
              icon: "success"
            });
            this.ngOnInit();
          }
        });
      }
    });
  }
  getAllNotice() {
    this.noticeService.getAll().subscribe((response: any) => {
      if (response.status) {
        this.notices = response.data;
        this.notices.sort((a, b) => {
          return (b.id ?? Number.MIN_SAFE_INTEGER) - (a.id ?? Number.MIN_SAFE_INTEGER);
        });
      }
    });
  }

}
