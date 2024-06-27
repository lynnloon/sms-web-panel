import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../util/common.service';
import { FamilyMember } from '../model/family-member';

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) { }

  getAllFamilyMemberList() {
    return this.httpClient.get(this.commonService.apiRoute + "/familyMember/getAll")
  }

  create(member:FamilyMember) {
    return this.httpClient.post(this.commonService.apiRoute + "/familyMember/save",member);
  }

  update(member:FamilyMember) {
    return this.httpClient.post(this.commonService.apiRoute + "/familyMember/update", member);
  }

  getById(id: any) {
   return this.httpClient.get(this.commonService.apiRoute+"/familyMember/getById?id="+id);
  }

  delete(id: any) {
  return this.httpClient.delete(this.commonService.apiRoute+"/familyMember/delete?id="+id);
  }
}
