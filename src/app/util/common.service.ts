import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  apiRoute = "http://localhost:3060/SMSAPI";

  constructor() { }

  inputAlert(message: string, icon: any) {
    Swal.fire({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      icon: icon,
      text: message,
      timer:3000
    });
  }

  confirmAlert(){
    
  }

}
