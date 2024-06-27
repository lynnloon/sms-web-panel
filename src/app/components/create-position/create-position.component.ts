import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'src/app/model/position';
import { PositionService } from 'src/app/service/position.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {
  editPosition?: boolean = false;

  position: Position = new Position();

  constructor(
    private positionService: PositionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService

  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const positionid = params['id'];
      if (positionid) {
        this.editPosition = true;
        this.getById(positionid);
      }
    })
  }

  getById(id: any) {
    this.positionService.getById(id).subscribe((response: any) => {
      if (response.status)
        this.position = response.data;
      else
        window.alert("No record data")
    });

  }

  save() {
    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message, "warning");
    else {
      if(this.editPosition){
        this. positionService.update(this. position).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/position-list']);
          }
        });
      }

    else {
      this.positionService.create(this.position).subscribe((response: any) => {
        if (response.status) {
          this.commonService.inputAlert(message, "success");
          this.router.navigate(['/position-list']);
        }
        else {
          this.commonService.inputAlert(response.message, 'error')
        }
      });
    }

  }
} 
 checkValidation() {
  if (this.position.name == undefined || this.position.name.trim() == "")
    return "Fill Position name"
  else
    return "OK"
  }

}

