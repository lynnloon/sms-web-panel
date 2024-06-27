import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AcademicYear } from 'src/app/model/academic-year';
import { AcademicService } from 'src/app/service/academic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})


export class AcademicComponent {


  year: AcademicYear = new AcademicYear();

  years: AcademicYear[] = [];

  
  constructor(
    private yearService: AcademicService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllAcademicYear();
  }

  getAllAcademicYear() {
    this.yearService.getAllAcademicYear().subscribe((response: any) => {
      if (response.status) {
        this.years = response.data;
      }
    });
  }

  delete(id:any) {

    Swal.fire({
      title: "Delete Comfirmation",
      text: "Are you sure to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"

    }).then((result) => {
      if (result.isConfirmed) {
        this.yearService.delete(id).subscribe((response: any) => {
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
