import { Injectable } from '@angular/core';
import { CommonService } from '../util/common.service';
import { HttpClient } from '@angular/common/http';
import { AcademicYear } from '../model/academic-year';



@Injectable({
  providedIn: 'root'
})
export class AcademicService {
 

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {}
  getAllAcademicYear() {
    return this.httpClient.get(this.commonService.apiRoute + "/academic_years/getAll");
  }
  getCurrent(){
    return this.httpClient.get(this.commonService.apiRoute+"/academic_years/getCurrent");
  }

  delete(id:any){
    return this.httpClient.delete(this.commonService.apiRoute+"/academic_years/delete?id="+id);
  }

  getById(id: any) {
    return this.httpClient.get(this.commonService.apiRoute + "/academic_years/getById?id=" + id);
  }

  create(year: AcademicYear) {
    return this.httpClient.post(this.commonService.apiRoute + "/academic_years/save", year);
  }

  update(year: AcademicYear) {
    return this.httpClient.post(this.commonService.apiRoute + "/academic_years/update", year);
  }

}