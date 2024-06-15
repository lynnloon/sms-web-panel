import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent  implements OnInit{
  user: User = new User();

  users: User[] = [];

 




  constructor(
    private userService: UserService
  ) { }


  ngOnInit() {
    this.getAllUserList();
  }

  getAllUserList() {
    this.userService.getAllUserList().subscribe((response: any) => {
      if (response.status) {
        this.users = response.data;
      }
    });
  }

}
