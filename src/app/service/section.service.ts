import { Injectable } from '@angular/core';
import { Section } from '../model/section';
import { CommonService } from '../util/common.service';
import { Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AcademicBatch } from '../model/academic-batch';
import { FilterDTO } from '../model/filter-dto';

@Injectable({
  providedIn: 'root'
})
export class SectionService {



  constructor(
    private commonService: CommonService,
    private httpClient: HttpClient,
  ) { }

  getSectionList(filter: FilterDTO) {
    return this.httpClient.post(this.commonService.apiRoute + "/section/getSectionList", filter);
  }

  getAllSection() {
    return this.httpClient.get(this.commonService.apiRoute + "/section/getAll")
  }

  create(section: Section) {
    return this.httpClient.post(this.commonService.apiRoute + "/section/create", section);
  }


  update(section: Section) {
    return this.httpClient.post(this.commonService.apiRoute + "/section/update", section);
  }

  getById(id: any) {
    return this.httpClient.get(this.commonService.apiRoute + "/section/getById?id=" + id);
  }


  delete(id: any) {
    return this.httpClient.delete(this.commonService.apiRoute + "/section/delete?id=" + id);
  }


}
