import { Injectable, OnInit } from '@angular/core';
import { CommonService } from '../util/common.service';
import { Timetable } from '../model/timetable';
import { HttpClient } from '@angular/common/http';
import { FilterDTO } from '../model/filter-dto';

@Injectable({
  providedIn: 'root'
})
export class TimetableService implements OnInit {

  constructor(
    private commonService:CommonService,
    private httpClient:HttpClient

  ) { }
  ngOnInit(): void {
  
  }
  save(timetable:Timetable[]){
    return this.httpClient.post(this.commonService.apiRoute+"/timetable/save",timetable);
  }
  getTimetableList(filter:FilterDTO)
  {
    return this.httpClient.post(this.commonService.apiRoute+"/timetable/retrieveTimetable",filter);
  }
getSection(filter:FilterDTO)
{
  return this.httpClient.post(this.commonService.apiRoute+"/section/getSection",filter);
  
} 
getSectionByTr(filter:FilterDTO)
{
  return this.httpClient.post(this.commonService.apiRoute+"/timetable/getSectionByTr",filter);
}
}
