import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminDashboardComponent } from './layout/admin-dashboard/admin-dashboard.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AcademicComponent } from './components/academic/academic.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'add-user', component: CreateUserComponent },
  { path: 'add-user/:id', component: CreateUserComponent },
  { path: 'year', component: AcademicComponent },

  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
