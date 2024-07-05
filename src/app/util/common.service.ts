import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
 
  apiRoute = "http://localhost:3060/SMSAPI";
  imageURL = "http://localhost:3060/SMSAPI"

  constructor(
    private httpClient: HttpClient
  ) { }

  login(user: User) {
    return this.httpClient.post(this.apiRoute + "/login/checkUser", user);
  } 

  getAllAcademicBatchList() {
  return this.httpClient.get(this.apiRoute+"/academicBatch/getAll");
  }

  getById(id: any) {
    return this.httpClient.get(this.apiRoute+"/academicBatch/getById?id="+id);
   }

// check password for password change in my profile
  checkpass(user:User){
    return this.httpClient.post(this.apiRoute+"/login/checkPassword",user);
  }
  changePass(usr:User){
    return this.httpClient.post(this.apiRoute+"/login/update",usr);
  }
  inputAlert(message: string, icon: any) {
    Swal.fire({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      icon: icon,
      text: message,
      timer: 3000
    });
  }

  confirmAlert() {

  }

}
