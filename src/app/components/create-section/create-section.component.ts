import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicBatch } from 'src/app/model/academic-batch';
import { FilterDTO } from 'src/app/model/filter-dto';
import { Section } from 'src/app/model/section';
import { Student } from 'src/app/model/student';
import { AcademicBatchService } from 'src/app/service/academic-batch.service';
import { SectionService } from 'src/app/service/section.service';
import { StudentService } from 'src/app/service/student.service';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit {

  editSection?: boolean = false;

  section: Section = new Section();
  batch: AcademicBatch = new AcademicBatch();
  filterDTO: FilterDTO = new FilterDTO();

  setStu: Student[] = [];
  sections: Section[] = [];
  batches: AcademicBatch[] = [];
  students: Student[] = [];
  selectedStuList: Student[] = [];

  constructor(
    private studentService: StudentService,
    public sectionService: SectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private academicBatchServie: AcademicBatchService,
  ) { }

  ngOnInit() {
    this.getAllAcademicBatchList();
    this.activatedRoute.params.subscribe(params => {
      const sectionid = params['id'];
      if (sectionid) {
        this.editSection = true;
        this.getById(sectionid);

      }
    });
  }

  onStudentChange() {
    this.filterDTO.major = this.section.major as string;
    this.filterDTO.batchId = this.batch.id;
    this.studentService.getStudentByBatch(this.filterDTO).subscribe((response: any) => {
      if (response.status) {
        this.students = response.data;
      //  console.log(this.students[0].select);
        this.sortStudentsByRollNo();
      }
    });
  }

  onChangeStu($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    if(isChecked){
      const tempselect = this.students.find((x:any)=>x.id == id);
      if(tempselect)
      this.selectedStuList.push(tempselect);
    }
    else{
      for(var y = 0; y < this.selectedStuList.length;y++){
        if(id == this.selectedStuList[y].id){
          this.selectedStuList.splice(y,1);
        }
      }
    }

    console.log("select list>>",this.selectedStuList);
  }


  sortStudentsByRollNo() {
    this.students.sort((a, b) => {
      return (a.stuRoll_no ?? Number.MAX_SAFE_INTEGER) - (b.stuRoll_no ?? Number.MAX_SAFE_INTEGER);
    });
  }

  getAllAcademicBatchList() {
    this.academicBatchServie.getAllAcademicBatchList().subscribe((response: any) => {
      if (response.status) {
        this.batches = response.data;
      }
    });
  }

  getById(id: any) {
    this.sectionService.getById(id).subscribe((response: any) => {
      if (response.status) {
        this.section = response.data;
        const setStu = this.section.students;
        if (setStu) {
          this.students = setStu;
        }
        const selectedBatch = this.batches.find(u => u.id === this.section.academicBatch?.id);
        if (selectedBatch) {
          this.batch = selectedBatch;
        }
      }
      else
        window.alert("No record data")
    });
  }

  save() {
    var message = this.checkValidation();
    if (message != 'OK')
      this.commonService.inputAlert(message, 'warning')
    else {
      if (this.editSection) {
        const selectedStudents = this.students.filter(student => student.select);
        // Prepare section object with selected students
        this.section.students = selectedStudents;
        this.sectionService.update(this.section).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success');
            this.router.navigate(['/section-list']);
          }
        });
      }
      else {
        // this.selectedStuList = this.students.filter(student => student.select === true);
        // console.log(this.selectedStuList);
        const selectedStudents = this.students.filter(student => student.select);
        // Prepare section object with selected students
        this.section.students = selectedStudents;
        
        this.section.students = this.selectedStuList;
        this.section.noOfStudent = this.section.students.length;
        this.sectionService.create(this.section).subscribe((response: any) => {
          if (response.status) {
            this.commonService.inputAlert(message, 'success')
            this.router.navigate(['/section-list']);
          } else {
            this.commonService.inputAlert(response.message, 'error')
          }
        });
      }

    }
  }
  checkValidation() {
    if (this.section.name == undefined || this.section.name.trim() == "")
      return "Fill section name"
    else
      return "OK"
  }

  onChangeCombo() {

    this.section.academicBatch = (this.batch);
  }

}
