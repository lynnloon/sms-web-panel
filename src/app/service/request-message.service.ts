import { Injectable, OnInit } from '@angular/core';
import { CommonService } from '../util/common.service';
import { HttpClient } from '@angular/common/http';
import { RequestMessage } from '../model/request-message';

@Injectable({
  providedIn: 'root'
})
export class RequestMessageService implements OnInit {

  constructor(
    private commonService: CommonService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
  }

  getAllReqMessage() {
    return this.httpClient.get(this.commonService.apiRoute + "/requestMessage/getAll");
  }

getAllByRequestStatus(){
  return this.httpClient.get(this.commonService.apiRoute + "/requestMessage/getAllByRequestStatus");
}

  getById(id: any) {
    return this.httpClient.get(this.commonService.apiRoute + "/requestMessage/getById?id=" + id);
  }

  create(reqMessage: RequestMessage) {
    return this.httpClient.post(this.commonService.apiRoute + "/requestMessage/save", reqMessage);
  }

  update(reqMessage: RequestMessage) {
    return this.httpClient.post(this.commonService.apiRoute + "/requestMessage/update", reqMessage);
  }

  delete(id: any) {
    return this.httpClient.delete(this.commonService.apiRoute + "/requestMessage/delete?id=" + id);
  }
}
