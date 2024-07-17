import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestMessage } from 'src/app/model/request-message';
import { RequestMessageService } from 'src/app/service/request-message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  reqMessage: RequestMessage = new RequestMessage();

  messages: RequestMessage[] = [];
  requestM: RequestMessage[] = [];
  role?: string;
  userName?: string;
  email?: string;

  constructor(
    private requestSer: RequestMessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('userrole') as string;
    this.userName = localStorage.getItem('userName') as string;
    this.email = localStorage.getItem('email') as string;
    if (this.role == 'ADMIN') {
      this.getAllReqMessage();
    }
    else if (this.role == 'STUDENT' || this.role == 'TEACHER') {
      this.email = localStorage.getItem('email') as string;
      this.getSelfMessage(this.email);
    }

    this.activatedRoute.params.subscribe(params => {
      const messageid = params['id'];
      if (messageid) {
        this.getById(messageid);
      }
    });
  }
  getSelfMessage(email: string) {
    this.requestSer.getSelfMessage(email).subscribe((response: any) => {
      if (response.status) {
        this.requestM = response.data;
      }
    });
  }

  getAllReqMessage() {
    this.requestSer.getAllReqMessage().subscribe((response: any) => {
      if (response.status) {
        this.messages = response.data;
      }
    });
  }

  getById(id: any) {
    this.requestSer.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.reqMessage = response.data;
      }
    });
  }

  delete(id: any) {

    Swal.fire({
      title: "Delete Comfirmation",
      text: "Are you sure to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        this.requestSer.delete(id).subscribe((response: any) => {
          if (response.status) {
            Swal.fire({
              title: "Deleted!",
              text: response.message,
              icon: "success"
            });
            this.ngOnInit();
          }

        });

      }
    });
  }

}
