import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicYear } from 'src/app/model/academic-year';
import { AcademicService } from 'src/app/service/academic.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-add-academic-year',
  templateUrl: './add-academic-year.component.html',
  styleUrls: ['./add-academic-year.component.css']
})
export class AddAcademicYearComponent {

 editAcademic?:boolean =false;
  year:AcademicYear=new AcademicYear();


  constructor(


  private yearService:AcademicService,
     private router: Router,
    private activatedRoute: ActivatedRoute,
      private commonService :CommonService
  ){}


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const yearid = params['id'];
      if (yearid) {
        this.editAcademic = true;
        this.getById(yearid)
      }

    });
  }

  getById(id: any) {
    this.yearService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.year = response.data;
      } else {
        window.alert('no record found');
      }
    });
  }

  save() {

    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message,'warning'); 
    else {
      if(this.editAcademic){
        this.yearService.update(this.year).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/year']);
          }
        });
      }  
    else {
      this.yearService.create(this.year).subscribe((response: any) => {
        if (response.status) {
          this.commonService.inputAlert(message,'Success'); 
          this.router.navigate(['/year']);
        }
      });
    }
  }

 

}
  checkValidation() {
    if (this.year.name == undefined || this.year.name.trim() == '')
      return "Fill Academic Year";
    else if (this.year.currentStatus == undefined)
      return "Fill current status";
    else if (this.year.startDate == undefined)
      return "Fill start Date";
    else if (this.year.endDate == undefined)
      return "Fill end Date";
    
    else
      return "OK";
  }
}
