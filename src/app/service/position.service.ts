import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../util/common.service';
import { Position } from '../model/position';

@Injectable({
  providedIn: 'root'
})
export class PositionService {


  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }


  getAllPositionList() {
    return this.httpClient.get(this.commonService.apiRoute + "/position/getAll")
  }

  create(position: Position) {
    return this.httpClient.post(this.commonService.apiRoute + "/position/save", position);
  }


  update(position: Position) {
    return this.httpClient.post(this.commonService.apiRoute + "/position/update", position);
  }

  getById(id: any) {
    return this.httpClient.get(this.commonService.apiRoute + "/position/getById?id=" + id);
  }


  delete(id: any) {
    return this.httpClient.delete(this.commonService.apiRoute + "/position/delete?id=" + id);
  }

}
