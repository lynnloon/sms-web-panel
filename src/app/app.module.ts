import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient,HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AcademicComponent } from './components/academic/academic.component';
import { AddAcademicYearComponent } from './components/add-academic-year/add-academic-year.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { CreateStaffComponent } from './components/create-staff/create-staff.component';
import { DepartmentListsComponent } from './components/department-lists/department-lists.component';
import { CreateDepartmentComponent } from './components/create-department/create-department.component';
<<<<<<< HEAD
import { SemesterListComponent } from './components/semester-list/semester-list.component';
import { CreateSemesterComponent } from './components/create-semester/create-semester.component';
=======
import { PositionListComponent } from './components/position-list/position-list.component';
import { CreatePositionComponent } from './components/create-position/create-position.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
>>>>>>> a3347d69ae48cb4ef3679f75d0d009f88c9c9a5e

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AdminDashboardComponent,
    CreateUserComponent,
    AcademicComponent,
    AddAcademicYearComponent,
    StaffListComponent,
    CreateStaffComponent,
    DepartmentListsComponent,
    CreateDepartmentComponent,
<<<<<<< HEAD
    SemesterListComponent,
    CreateSemesterComponent,
=======
    PositionListComponent,
    CreatePositionComponent,
    SubjectListComponent,
    CreateSubjectComponent,
>>>>>>> a3347d69ae48cb4ef3679f75d0d009f88c9c9a5e
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
