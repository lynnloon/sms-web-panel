import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './util/common.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {


  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  getAllUserList() {
    return this.httpClient.get(this.commonService.apiRoute + "/item/getAll")
  }}
