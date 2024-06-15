import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

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

  delete(id: any) {

    Swal.fire({
      title: "Are you sure?",
      text: "!!!!!!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sure!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe((response: any) => {
          if (response.status) {
            Swal.fire({
              title: "Deleted!",
            text: "This  record  has been deleted.",
           icon: "success"
          });
            this.ngOnInit();
          }

        });
        
      }
    });
    
  }

}
