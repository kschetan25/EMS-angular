import { ListEmployeesComponent } from './../list-employees/list-employees.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Entity/employee';
import { formatDate } from '@angular/common';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css'],
})
export class AddEmployeesComponent implements OnInit {
  employee = {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: null,
    dateOfJoin: null,
    phoneNumber: '',
    emp_id: null,
  };
  submitted = false;
  constructor(private empService: EmployeeService, private router: Router) {}

  ngOnInit(): void {}

  public addEmployee() {
    this.employee.dateOfBirth = formatDate(
      this.employee.dateOfBirth,
      'MM-dd-yyyy',
      'en-US'
    );
    this.employee.dateOfJoin = formatDate(
      this.employee.dateOfJoin,
      'MM-dd-yyyy',
      'en-US'
    );
    this.empService.saveEmployee(this.employee).subscribe(
      (response) => {
        this.submitted = true;
        this.router.navigate(['/']);
      },
      (errors) => {
        console.log(errors);
      }
    );
  }
  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: null,
      dateOfJoin: null,
      phoneNumber: '',
      emp_id: null,
    };
  }
  cancelAdd() {
    this.router.navigate(['/']);
  }
}
