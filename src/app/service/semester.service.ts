import { Injectable, OnInit } from '@angular/core';
import { CommonService } from '../util/common.service';
import { HttpClient } from '@angular/common/http';
import { Semester } from '../model/semester';

@Injectable({
  providedIn: 'root'
})
export class SemesterService implements OnInit {

  constructor(
    private commonService:CommonService,
    private httpClient:HttpClient
  ) { }
  ngOnInit() {

  }

  getAllSemester(){
    return this.httpClient.get(this.commonService.apiRoute+"/semester/getAll");

  }

  getById(id:any){
    return this.httpClient.get(this.commonService.apiRoute+"/semester/getById?id="+id);
  }

  create(semester:Semester){
    return this.httpClient.post(this.commonService.apiRoute+"/semester/save",semester);
  }

  delete(id:any){
    return this.httpClient.delete(this.commonService.apiRoute+"/semester/delete?id="+id);
  }

}
