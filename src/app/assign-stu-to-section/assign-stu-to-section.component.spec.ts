import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStuToSectionComponent } from './assign-stu-to-section.component';

describe('AssignStuToSectionComponent', () => {
  let component: AssignStuToSectionComponent;
  let fixture: ComponentFixture<AssignStuToSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignStuToSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignStuToSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
