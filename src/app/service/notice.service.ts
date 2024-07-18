import { Injectable, OnInit } from '@angular/core';
import { Notice } from '../model/notice';
import { CommonService } from '../util/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticeService implements OnInit {


  constructor(
    private commonService: CommonService,
    private httpClient: HttpClient
  ) { }
  ngOnInit() {
  }

  getAll() {
    return this.httpClient.get(this.commonService.apiRoute + "/notice/getAll");
  }

  getAllByNoticeStatus() {
    return this.httpClient.get(this.commonService.apiRoute + "/notice/getAllByNoticeStatus");
  }

  getById(id: any) {
    return this.httpClient.get(this.commonService.apiRoute + "/notice/getById?id=" + id);
  }

  create(notice: Notice) {
    return this.httpClient.post(this.commonService.apiRoute + "/notice/save", notice);
  }

  update(notice: Notice) {
    return this.httpClient.post(this.commonService.apiRoute + "/notice/update", notice);
  }

  delete(id: any) {
    return this.httpClient.delete(this.commonService.apiRoute + "/notice/delete?id=" + id);
  }
}