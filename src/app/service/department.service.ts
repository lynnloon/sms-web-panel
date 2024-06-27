import { Injectable } from '@angular/core';
import { CommonService } from '../util/common.service';
import { HttpClient } from '@angular/common/http';
import { Department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  getAllDepartmentList() {
    return this.httpClient.get(this.commonService.apiRoute + "/department/getAll")
  }

  create(department: Department) {
    return this.httpClient.post(this.commonService.apiRoute + "/department/save", department);
  }

  update(department: Department) {
    return this.httpClient.post(this.commonService.apiRoute + "/department/update", department);
  }

  getById(id: any) {
   return this.httpClient.get(this.commonService.apiRoute+"/department/getById?id="+id);
  }

  delete(id: any) {
  return this.httpClient.delete(this.commonService.apiRoute+"/department/delete?id="+id);
  }

}
