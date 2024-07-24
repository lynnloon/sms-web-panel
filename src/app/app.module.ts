import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { AcademicComponent } from './components/academic/academic.component';
import { AddAcademicYearComponent } from './components/add-academic-year/add-academic-year.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { CreateStaffComponent } from './components/create-staff/create-staff.component';
import { DepartmentListsComponent } from './components/department-lists/department-lists.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
import { SemesterListComponent } from './components/semester-list/semester-list.component';
import { CreateSemesterComponent } from './components/create-semester/create-semester.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { CreatePositionComponent } from './components/create-position/create-position.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { TeacherSidebarComponent } from './layout/teacher-sidebar/teacher-sidebar.component';
import { StudentSidebarComponent } from './layout/student-sidebar/student-sidebar.component';
import { StudentDashboardComponent } from './layout/student-dashboard/student-dashboard.component';
import { DatePipe } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { TeacherDashboardComponent } from './layout/teacher-dashboard/teacher-dashboard.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// drap and drop
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ReadMessageComponent } from './components/read-message/read-message.component';
import { SectionComponent } from './components/section/section.component';
import { CreateSectionComponent } from './components/create-section/create-section.component';
import { NoticeBoardComponent } from './components/notice-board/notice-board.component';
import { CreateNoticeComponent } from './components/create-notice/create-notice.component';
import { NoticeContentComponent } from './components/notice-content/notice-content.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AdminDashboardComponent,
    AcademicComponent,
    AddAcademicYearComponent,
    StaffListComponent,
    CreateStaffComponent,
    DepartmentListsComponent,
    CreateDepartmentComponent,
    SemesterListComponent,
    CreateSemesterComponent,
    PositionListComponent,
    CreatePositionComponent,
    SubjectListComponent,
    CreateSubjectComponent,
    StudentListComponent,
    CreateStudentComponent,
    TeacherSidebarComponent,
    StudentSidebarComponent,
    StudentDashboardComponent,
    ContactComponent,
    MyProfileComponent,
    TimetableComponent,
    TeacherDashboardComponent,
    MessageListComponent,
    ReadMessageComponent,
    SectionComponent,
    CreateSectionComponent,
    NoticeBoardComponent,
    CreateNoticeComponent,
    NoticeContentComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MultiSelectModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    DragDropModule,
    NgChartsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
