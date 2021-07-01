import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from './employees/add-employees/add-employees.component';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'employees',
  pathMatch: 'full'
},{
  path: 'employees',
  component: ListEmployeesComponent
}, {
  path: 'add-employee',
  component: AddEmployeesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
