import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeContentComponent } from './notice-content.component';

describe('NoticeContentComponent', () => {
  let component: NoticeContentComponent;
  let fixture: ComponentFixture<NoticeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticeContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
