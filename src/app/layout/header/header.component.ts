import { Component, OnInit, HostListener } from '@angular/core';
import { RequestMessage } from 'src/app/model/request-message';
import { RequestMessageService } from 'src/app/service/request-message.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName?: string;
  profile?: string;
  role?: string;
  isDropdownOpen: boolean = false;
  isMessagesDropdownOpen: boolean = false;
  isNotiDropdownOpen: boolean = false;

  reqMessage: RequestMessage = new RequestMessage();

  messages: RequestMessage[] = [];


  constructor(
    private commonService: CommonService,
    private requestSer: RequestMessageService,
  ) { }

  ngOnInit() {
    this.role = localStorage.getItem('userrole') as string;
    this.userName = localStorage.getItem('userName') as string;
    this.profile = localStorage.getItem('profile') as string;
    this.profile = this.commonService.imageURL + this.profile;
    this.getAllByRequestStatus();
  }
  getAllByRequestStatus() {
    this.requestSer.getAllByRequestStatus().subscribe((response: any) => {
      if (response.status) {
        this.messages = response.data;
      }
    });
  }

  toggleDropdown(dropdown: string): void {
    if (dropdown == 'profile') {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.isMessagesDropdownOpen = false;
      this.isNotiDropdownOpen = false;
    } else if (dropdown == 'messages') {
      this.isMessagesDropdownOpen = !this.isMessagesDropdownOpen;
      this.isDropdownOpen = false;
      this.isNotiDropdownOpen = false;
    }
    else if (dropdown == 'noti') {
      this.isNotiDropdownOpen = !this.isNotiDropdownOpen;
      this.isDropdownOpen = false;
      this.isMessagesDropdownOpen = false;
    }
    else if (dropdown == 'showAll') {
      this.isDropdownOpen = false;
      this.isMessagesDropdownOpen = false;
      this.isNotiDropdownOpen = false;
    }
  }


  // autoClose dropdown messeage
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.dropdown',)) {
      this.isDropdownOpen = false;
      this.isNotiDropdownOpen = false;
      this.isMessagesDropdownOpen = false;
    }
  }

}


