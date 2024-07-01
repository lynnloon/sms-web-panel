import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName?: string;
  profile?: string;

  constructor(
    private commonService : CommonService
  ){}

  ngOnInit() {
    this.userName = localStorage.getItem('userName') as string;
    this.profile = localStorage.getItem('profile') as string;
    this.profile = this.commonService.imageURL + this. profile;
  }

}
