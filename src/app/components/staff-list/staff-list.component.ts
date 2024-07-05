import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/model/staff';
import { StaffService } from 'src/app/service/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  
  staff : Staff = new Staff();
  staffs:Staff[]=[];
  
  constructor(
    private staffService:StaffService
  ){}

  
  ngOnInit(){
 this.getAllStaffList();
  }

  getAllStaffList(){
 this.staffService.getAllStaffList().subscribe((response:any)=>{
  if (response.status) {
    this.staffs = response.data;
 }
  });
  }

  delete(id: any) {
    Swal.fire({
      // delete,cancel alert
      title: "Delete Comfirmation",
      text: "Are you sure to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"

    }//end delete,cancel alert
  
  ).then((result) => {
      if (result.isConfirmed) {

        this.staffService.delete(id).subscribe((response: any) => {
          if (response.status) {
          Swal.fire({
          title: "Deleted!",
           text: response.message,
           icon: "success"
         });
            this.ngOnInit();
          }
        });
        
      }
    });

    
  }


}

