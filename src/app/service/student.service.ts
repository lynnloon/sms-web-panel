import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../util/common.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  filesave(formData: any) {
    return this.httpClient.post(this.commonService.apiRoute+"/student/uploadStudentFile", formData);
  }

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  
  create(student: Student) {
    return this.httpClient.post(this.commonService.apiRoute + "/student/save",student );
  }
  getById(id: any) {
    return this.httpClient.get(this.commonService.apiRoute + "/student/getById?id=" + id);
  }

  update(student:Student){
    return this.httpClient.post(this.commonService.apiRoute+"/student/update",student);
  }

  delete(id: any) {
    return this.httpClient.delete(this.commonService.apiRoute+"/student/delete?id="+id);
  }
  getAllStudentList() {
    return this.httpClient.get(this.commonService.apiRoute + "/student/getAll");
  }

}
