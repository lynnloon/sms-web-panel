import { Component, OnInit } from '@angular/core';
import { Position } from 'src/app/model/position';
import { PositionService } from 'src/app/service/position.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

  position: Position = new Position();

  positions: Position[] = []

  constructor(
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.getAllPositionList();
  }

  getAllPositionList() {
    this.positionService.getAllPositionList().subscribe((response: any) => {
      if (response.status) {
        this.positions = response.data;
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
        this.positionService.delete(id).subscribe((response: any) => {
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
