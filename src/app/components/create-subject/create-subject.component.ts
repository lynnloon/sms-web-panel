import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/service/subject.service';


@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  editSubject?: boolean = false;

  subject:Subject = new Subject();

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }


  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      const subjectid=params['id'];
      if(subjectid){
        this.editSubject=true;
        this.getById(subjectid);
      }
    });
  }

  getById(id:any){
    this.subjectService.getById(id).subscribe((response:any)=>{
      if(response.status)
        this.subject=response.data;
      else
      window.alert("No record data")
    });
  }



  save() {
    var message = this.checkValidation();
    if (message != 'OK')
      window.alert(message);
    else {
      this.subjectService.create(this.subject).subscribe((response: any) => {
        if (response.status) {
          window.alert(response.message);
          this.router.navigate(['/subject-list']);
        }
      });
    }

  }




  checkValidation(): string {
    if (this.subject.name == undefined || this.subject.name.trim() == "")
      return "Fill subject name"
    else
      return "OK"
  }

}
