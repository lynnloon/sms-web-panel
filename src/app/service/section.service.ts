import { Injectable } from '@angular/core';
import { Section } from '../model/section';
import { CommonService } from '../util/common.service';
import { Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AcademicBatch } from '../model/academic-batch';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
 


  constructor(
    private commonService: CommonService,
    private httpClient: HttpClient,
  ) { }

  getSectionList(section: Section) {
    return this.httpClient.get(this.commonService.apiRoute + "/section/getSectionList");
  }

}
