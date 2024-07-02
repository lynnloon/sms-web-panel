import { Component, OnInit,HostListener } from '@angular/core';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName?: string;
  profile?: string;
  isDropdownOpen: boolean = false;
  isMessagesDropdownOpen:boolean=false;
  isNotiDropdownOpen:boolean=false;
  constructor(
    private commonService : CommonService
  ){}

  ngOnInit() {
    this.userName = localStorage.getItem('userName') as string;
    this.profile = localStorage.getItem('profile') as string;
    this.profile = this.commonService.imageURL + this. profile;
  }
  

  // toggleDropdown() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }

  toggleDropdown(dropdown: string): void {
    if (dropdown == 'profile') {
      this.isDropdownOpen = !this.isDropdownOpen;
      this.isMessagesDropdownOpen=false;
      this.isNotiDropdownOpen=false;
    } else if (dropdown == 'messages') {
      this.isMessagesDropdownOpen = !this.isMessagesDropdownOpen;
      this.isDropdownOpen=false;
      this.isNotiDropdownOpen=false;
    }
    else if (dropdown == 'noti') {
      this.isNotiDropdownOpen = !this.isNotiDropdownOpen;
      this.isDropdownOpen=false;
      this.isMessagesDropdownOpen=false;
    }
  }

 
// autoClose dropdown messeage
@HostListener('document:click', ['$event'])
onClick(event: MouseEvent) {
  const targetElement = event.target as HTMLElement;
  if (!targetElement.closest('.dropdown',)) {
    this.isDropdownOpen = false;
    this.isNotiDropdownOpen=false;
    this.isMessagesDropdownOpen=false;
  }
}

}


