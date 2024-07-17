import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestMessage } from 'src/app/model/request-message';
import { RequestMessageService } from 'src/app/service/request-message.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name!: string;
  email!: string;

  reqMessage: RequestMessage = new RequestMessage();

  constructor(
    private requestSer: RequestMessageService,
    private commonService: CommonService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.name = localStorage.getItem('userName') as string;
    this.email = localStorage.getItem('email') as string;
  }

  save() {
    this.reqMessage.name = localStorage.getItem('userName') as string;
    this.reqMessage.email = localStorage.getItem('email') as string;
    this.reqMessage.profile = localStorage.getItem('profile') as string;
    var message = this.checkValidation();
    if (message != 'Your message has been sent.')
      this.commonService.inputAlert(message, 'warning');
    else {
      this.requestSer.create(this.reqMessage).subscribe((response: any) => {
        if (response.status) {
          this.commonService.inputAlert(message, 'success');
          this.router.navigate(['/contact']);
        }
      });
    }
  }

  checkValidation() {
    if (this.reqMessage.name == undefined || this.reqMessage.name.trim() == '')
      return "Fill your name";
    else if (this.reqMessage.email == undefined || this.reqMessage.email.trim() == '')
      return "Fill your email";
    else if (this.reqMessage.title == undefined || this.reqMessage.title.trim() == '')
      return "Fill subject of your message";
    else if (this.reqMessage.message == undefined || this.reqMessage.message.trim() == '')
      return "Fill your message";
    else
      return "Your message has been sent.";
  }

}
