import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Entity/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent implements OnInit {
  public employees: Employee[];
  public selectedEmployee: Employee;

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.empService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (errors: HttpErrorResponse) => {
        console.log(errors.message);
      }
    );
  }

  public selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  public updateEmployee(employee: Employee) {
    console.log(employee);
    this.empService.updateEmployee(employee).subscribe(
      (response) => {
        this.getEmployees();
      },
      (errors: HttpErrorResponse) => {
        console.log(errors);
      }
    );
  }

  public deleteEmployee(employee: Employee) {
    this.empService.deleteEmployee(employee.emp_id).subscribe(
      (response) => {
        this.getEmployees();
      },
      (errors: HttpErrorResponse) => {
        console.log(errors.message);
      }
    );
  }
}
