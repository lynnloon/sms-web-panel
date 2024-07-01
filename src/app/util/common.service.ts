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
