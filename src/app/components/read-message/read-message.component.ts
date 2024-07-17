import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestMessage } from 'src/app/model/request-message';
import { RequestMessageService } from 'src/app/service/request-message.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-read-message',
  templateUrl: './read-message.component.html',
  styleUrls: ['./read-message.component.css']
})
export class ReadMessageComponent implements OnInit {

  reqMessage: RequestMessage = new RequestMessage();
  profile?: string;

  constructor(
    private requestSer: RequestMessageService,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
  ) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const messageid = params['id'];
      if (messageid) {
        this.getById(messageid);
      }
    });
   
  }

  getById(id: any) {
    this.requestSer.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.reqMessage = response.data;
        this.profile = this.commonService.imageURL + this.reqMessage.profile;
        this.update(this.reqMessage);
      }
    });
  }

  update(reqMessage: RequestMessage) {
    this.requestSer.update(reqMessage).subscribe((response: any) => {
      if (response.status)
        this.reqMessage = response.data;
    })
  }

}
