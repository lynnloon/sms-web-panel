import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
import { StudentDashboardComponent } from './layout/student-dashboard/student-dashboard.component';
import { StudentSidebarComponent } from './layout/student-sidebar/student-sidebar.component';
import { TeacherSidebarComponent } from './layout/teacher-sidebar/teacher-sidebar.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { TeacherDashboardComponent } from './layout/teacher-dashboard/teacher-dashboard.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ReadMessageComponent } from './components/read-message/read-message.component';
import { SectionComponent } from './components/section/section.component';
import { CreateSectionComponent } from './components/create-section/create-section.component';
import { NoticeBoardComponent } from './components/notice-board/notice-board.component';
import { CreateNoticeComponent } from './components/create-notice/create-notice.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'year', component: AcademicComponent },
  { path: 'add-year', component: AddAcademicYearComponent },
  { path: 'add-year/:id', component: AddAcademicYearComponent },
  { path: 'staff-list', component: StaffListComponent },
  { path: 'add-staff', component: CreateStaffComponent },
  { path: 'add-staff/:id', component: CreateStaffComponent },
  { path: 'department-list', component: DepartmentListsComponent },
  { path: 'add-dept', component: CreateDepartmentComponent },
  { path: 'add-dept/:id', component: CreateDepartmentComponent },
  { path: 'position-list', component: PositionListComponent },
  { path: 'add-position', component: CreatePositionComponent },
  { path: 'add-position/:id', component: CreatePositionComponent },
  { path: 'subject-list', component: SubjectListComponent },
  { path: 'add-subject', component: CreateSubjectComponent },
  { path: 'add-subject/:id', component: CreateSubjectComponent },
  { path: 'semester-list', component: SemesterListComponent },
  { path: 'add-semester', component: CreateSemesterComponent },
  { path: 'add-semester/:id', component: CreateSemesterComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'add-student', component: CreateStudentComponent },
  { path: 'add-student/:id', component: CreateStudentComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'message-list', component: MessageListComponent },
  { path: 'read-message', component: ReadMessageComponent },
  { path: 'read-message/:id', component: ReadMessageComponent },
  { path: 'section-list', component: SectionComponent },
  { path: 'add-section', component: CreateSectionComponent },
  { path: 'add-section/:id', component: CreateSectionComponent },

  //notice board
  { path: 'notice-board', component: NoticeBoardComponent },
  { path: 'add-notice', component: CreateNoticeComponent },
  { path: 'add-notice/:id', component: CreateNoticeComponent },



  //Timetable testing
  { path: 'timetable', component: TimetableComponent },


  // For Student Dashboard
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'student-sidebar', component: StudentSidebarComponent },

  // For Teacher
  { path: 'teacher-sidebar', component: TeacherSidebarComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
