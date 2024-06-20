import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'src/app/model/position';
import { Staff } from 'src/app/model/staff';
import { PositionService } from 'src/app/service/position.service';
import { StaffService } from 'src/app/service/staff.service';
import { CommonService } from 'src/app/util/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css']
})
export class CreateStaffComponent implements OnInit {

  editStaff?: boolean = false;
  staff: Staff = new Staff();

  position: Position = new Position();

  positions: Position[] = [];
 

  constructor(
    private positionService: PositionService,
    private staffService: StaffService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService :CommonService
  ) { }

  ngOnInit() {
    this.getAllPositionList();
    this.activatedRoute.params.subscribe(params => {
      const staffid = params['id'];
      if (staffid) {
        this.editStaff = true;
        this.getById(staffid)
      }
    });
   
  }

  getAllPositionList() {
    this.positionService.getAllPositionList().subscribe((response: any) => {
      if (response.status) {
        this.positions = response.data;
       
        
      }
    });
  }

  getById(id: any) {
    this.staffService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.staff = response.data;
      
        const selectedPos = this.positions.find(u => u.id === this.staff.staffPosition?.id);

        if(selectedPos){
          this.position = selectedPos;
        }
         
      } else {
        window.alert('no record found');
      }
    });
  }

  save() {
    debugger;
    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message,'warning');     
    else {
      this.staffService.create(this.staff).subscribe((response: any) => {
        if (response.status) {
          this.commonService.inputAlert(message,'success'); 
          this.router.navigate(['/staff-list']);
        }
      });
    }
  }

  checkValidation(): string {
   if (this.staff.staffName == undefined || this.staff.staffName.trim() == '')
      return "Fill Staff name please! ";
    else if (this.staff.staffPhoneNo == undefined || this.staff.staffPhoneNo.trim() == '')
      return "Fill phone no please!";
    else if (this.staff.staffAddress == undefined || this.staff.staffAddress.trim() == '')
      return "Fill address please!";
    else if (this.staff.staffEmail == undefined || this.staff.staffEmail.trim() == '')
      return "Fill email please!";
    else if (this.staff.staffNrcNo == undefined || this.staff.staffNrcNo.trim() == '')
      return "Fill NrcNo Please!";
    else if (this.staff.staffGender == undefined || this.staff.staffGender.trim() == '')
      return "Fill Gender Please!";
    // else if (this.staff.staffPosition == undefined || this.staff.staffPosition.trim() == '')
    //   return "Fill Position Please!";
    else if (this.staff.staffProfilePicture == undefined || this.staff.staffProfilePicture.trim() == '')
      return "Upload ProfilePicture Please!";
    else
      return "OK";
  }

  onChangeCombo(){
    this.staff.staffPosition = new Position();
      this.staff.staffPosition=(this.position);
  }
}
