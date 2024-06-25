import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  file:any;
getFile(event: any) {

this.file=event.target.file[0];
(console.log("uploadFile",this.file));


}


submitData(){
let formData=new FormData;
formData.set("uploadFile",this.file);


this.httpClient.post('http://localhost:3060/SMSAPI/staff/uploadStaffFile',formData).subscribe((response:any)=>{
  if(response.status)
    {
      window.alert(response.data);
      
    }
});
}
  editUser?: boolean = false;

  user: User = new User();

  constructor(
    private httpClient:HttpClient,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const studentid = params['id'];
      if (studentid) {
        this.editUser = true;
        this.getById(studentid)
      }

    });
  }

  getById(id: any) {
    this.userService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.user = response.data;
      } else {
        window.alert('no record found');
      }
    });
  }

  save() {

    var message = this.checkValidation();
    if (message != 'OK')
      window.alert(message);
    else {
      this.userService.create(this.user).subscribe((response: any) => {
        if (response.status) {
          window.alert(response.message);
          this.router.navigate(['/user-list']);
        }
      });
    }
  }

  checkValidation(): string {
    
    if (this.user.userName == undefined || this.user.userName.trim() == '')
      return "Fill user name";
    else if (this.user.phoneNo == undefined || this.user.phoneNo.trim() == '')
      return "Fill phone no";
    else if (this.user.address == undefined || this.user.address.trim() == '')
      return "Fill address";
    else
      return "OK";
  }

}
