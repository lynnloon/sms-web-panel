import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role?: string ;

  constructor(){
    
  }
  ngOnInit(){
   this.role= localStorage.getItem('userrole') as string;
  }
}
