import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { CommonService } from '../util/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {

  }

  login() {
    if (this.user.userName != undefined && this.user.userName.trim() != '' && this.user.password != undefined) {
      this.commonService.login(this.user).subscribe((response: any) => {
        if (response.status) {
          this.user = response.data;
          localStorage.setItem('userrole', this.user.role as string);
          localStorage.setItem('profile', this.user.userProfile as string);
          localStorage.setItem('userName', this.user.userName as string);

          if (this.user.role == 'STUDENT')
            this.router.navigate(['/student-dashboard'])
          else if (this.user.role == 'TEACHER')
            this.router.navigate(['/admin-dashboard'])
        } else {
          window.alert(response.message);
        }
      });

    }
    else
      window.alert('Invalid user name or password.')

  }

}
