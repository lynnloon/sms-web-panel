import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-sidebar',
  templateUrl: './teacher-sidebar.component.html',
  styleUrls: ['./teacher-sidebar.component.css']
})
export class TeacherSidebarComponent {
  role : string | null = null;

  constructor(){
    this.role = localStorage.getItem('userrole') as string;
  }
}
