import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  role : string  | null = null;

  constructor(){
    this.role = localStorage.getItem('userrole');
  }
}
