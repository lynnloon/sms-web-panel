import { Injectable } from '@angular/core';
import { CommonService } from '../util/common.service';
import { HttpClient } from '@angular/common/http';
import { Staff } from '../model/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private commonService:CommonService,
    private httpClient:HttpClient

  ) { }

  filesave(formData: FormData) {
    return this.httpClient.post(this.commonService.apiRoute+"/staff/uploadStaffFile", formData);
  }
  getAllStaffList(){
    return this.httpClient.get(this.commonService.apiRoute+"/staff/getAll");
    }
  

    getById(id:any){
      return this.httpClient.get(this.commonService.apiRoute+"/staff/getById?id="+id);
    }

    getStaffInfoByEmail(email: string) {
      return this.httpClient.get(this.commonService.apiRoute+"/staff/getStaffInfoByEmail?email="+email);
    }

    create(staff:Staff){
      return this.httpClient.post(this.commonService.apiRoute+"/staff/save",staff);
    }

    update(staff:Staff){
      return this.httpClient.post(this.commonService.apiRoute+"/staff/update",staff);
    }

    delete(id:any){
      return this.httpClient.delete(this.commonService.apiRoute+"/staff/delete?id="+id);
    }
  }

