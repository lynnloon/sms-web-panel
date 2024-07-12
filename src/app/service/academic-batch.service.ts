import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../util/common.service';

@Injectable({
  providedIn: 'root'
})
export class AcademicBatchService {

  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) { }

  getAllAcademicBatchList() {
    return this.httpClient.get(this.commonService.apiRoute+"/academicBatch/getAll");
    }
  
    getById(id: any) {
      return this.httpClient.get(this.commonService.apiRoute+"/academicBatch/getById?id="+id);
     }
  
}
