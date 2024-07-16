import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestMessage } from 'src/app/model/request-message';
import { RequestMessageService } from 'src/app/service/request-message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  reqMessage: RequestMessage = new RequestMessage();

  messages: RequestMessage[] = [];

  constructor(
    private requestSer: RequestMessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getAllReqMessage();
    this.activatedRoute.params.subscribe(params => {
      const messageid = params['id'];
      if (messageid) {
        this.getById(messageid);
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

}
