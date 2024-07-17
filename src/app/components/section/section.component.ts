import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/model/section';
import { SectionService } from 'src/app/service/section.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  section: Section = new Section();

  sections: Section[] = [];

  constructor(
    private sectionService: SectionService,
  ) { }

  ngOnInit() {
    this.getAllSection();
  }

  getBatchNumber(batchName: string | undefined): string {
    switch (batchName) {
      case 'FIRST YEAR':
        return '1';
      case 'SECOND YEAR':
        return '2';
      case 'THIRD YEAR':
        return '3';
      case 'FOURTH YEAR':
        return '4';
      case 'FIFTH YEAR':
        return '5'
      case 'MASTER':
        return '6';
      default:
        return 'Unknown';
    }
  }

  getAllSection() {
    return this.sectionService.getAllSection().subscribe((response: any) => {
      if (response.status) {
        this.sections = response.data;
      }
    });
  }

  delete(id: any) {

    Swal.fire({
      title: "Delete Comfirmation",
      text: "Are you sure to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        this.sectionService.delete(id).subscribe((response: any) => {
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
