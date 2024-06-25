import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../util/common.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  getAllUserList() {
    return this.httpClient.get(this.commonService.apiRoute + "/user/getAll");
  }

  getById(id: any) {
    return this.httpClient.get(this.commonService.apiRoute + "/user/getById?id=" + id);
  }

  create(user: User) {
    return this.httpClient.post(this.commonService.apiRoute + "/user/save", user);
  }

  delete(id:any){
    return this.httpClient.delete(this.commonService.apiRoute+"/user/delete?userId="+id);
  }
}
