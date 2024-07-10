import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../util/common.service';
import { Subject } from '../model/subject';
import { AcademicBatch } from '../model/academic-batch';
import { Semester } from '../model/semester';
import { FilterDTO } from '../model/filter-dto';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
 
  
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

 
  getAllSubjectList() {
    return this.httpClient.get(this.commonService.apiRoute + "/subject/getAll");
  }

  create(subject: Subject) {
    return this.httpClient.post(this.commonService.apiRoute + "/subject/save", subject);
  }

  update(subject: Subject) {
    return this.httpClient.post(this.commonService.apiRoute + "/subject/update", subject);
  }
 
  getSubByBatch(filterDTO: FilterDTO) {
    return this.httpClient.post(this.commonService.apiRoute + "/subject/getSubByBatch",filterDTO);
  } 

  getById(id: any) {
    return this.httpClient.get(this.commonService.apiRoute+"/subject/getById?id="+id);
  }

  delete(id: any) {
    return this.httpClient.delete(this.commonService.apiRoute+"/subject/delete?id="+id);
  }

}
