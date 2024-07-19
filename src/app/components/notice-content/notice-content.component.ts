import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from 'src/app/model/notice';
import { NoticeService } from 'src/app/service/notice.service';
import { CommonService } from 'src/app/util/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notice-content',
  templateUrl: './notice-content.component.html',
  styleUrls: ['./notice-content.component.css']
})
export class NoticeContentComponent implements OnInit {

  notice: Notice = new Notice();
  editNotice?: boolean = false;
  form!: FormGroup;
  filepath!: string;

  constructor(
    private noticeService: NoticeService,
    public commonService: CommonService,
    private router: Router,
    private datePipe: DatePipe,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      const noticeid = params['id'];
      if (noticeid) {
        this.editNotice = true;
        this.getById(noticeid);
      }
    });
    this.form = this.fb.group({
      cover: [null],
    });
  }

  getById(id: any) {
    this.noticeService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.notice = response.data; {
          this.filepath = this.commonService.apiRoute + this.notice.noticePicture;
        }
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
          this.saveNoticeFile();
        }
      }
      reader.readAsDataURL(tempfile);
    }
    else {
      event.target.value = null;
      Swal.fire("Please add only image-types");

    }
  }

  saveNoticeFile() {
    var formData: any = new FormData();
    formData.append('uploadFile', this.form?.get('cover')?.value);
    this.noticeService.saveNoticeFile(formData).subscribe({
      next: (response: any) => {
        if (response) {
          this.notice.noticePicture = response.data;
        } else {
          this.commonService.inputAlert(response.message, 'warning');
        }
      },
      error: (err: any) => {
        Swal.fire("Please Choose image file");
      }
    });
  }

}
