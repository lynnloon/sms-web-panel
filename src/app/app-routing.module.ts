import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/admin-dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'add-user', component: CreateUserComponent },
  { path: 'add-user/:id', component: CreateUserComponent },
  { path: 'year', component: AcademicComponent },
  { path: 'add-year', component: AddAcademicYearComponent },
  { path: 'add-year/:id', component: AddAcademicYearComponent },
  { path: 'staff-list',component:StaffListComponent},
  { path: 'add-staff',component:CreateStaffComponent},
  { path: 'add-staff/:id',component:CreateStaffComponent},
  { path: 'department-list', component: DepartmentListsComponent },
  { path: 'add-dept', component:CreateDepartmentComponent},
  { path: 'add-dept/:id', component:CreateDepartmentComponent},
  { path: 'position-list', component:PositionListComponent},
  { path: 'add-position', component:CreatePositionComponent},
  { path: 'add-position/:id', component:CreatePositionComponent},
  { path: 'subject-list', component:SubjectListComponent},
  { path: 'add-subject', component:CreateSubjectComponent},
   { path: 'add-subject/:id', component:CreateSubjectComponent},
  { path: 'semester-list',component:SemesterListComponent},
  { path: 'add-semester',component:CreateSemesterComponent},
  { path: 'add-semester/:id',component:CreateSemesterComponent},

  // For Student Dashboard
  { path: 'student-dashboard',component:StudentDashboardComponent},
  { path: 'student-sidebar',component:StudentSidebarComponent},

  // For Teacher
  { path: 'teacher-sidebar',component:TeacherSidebarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
