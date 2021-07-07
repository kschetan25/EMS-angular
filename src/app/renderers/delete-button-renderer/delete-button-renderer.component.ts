import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ListEmployeesComponent } from './../../employees/list-employees/list-employees.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import {
  IAfterGuiAttachedParams,
  ICellRendererParams,
} from 'ag-grid-community';

@Component({
  selector: 'app-delete-button-renderer',
  templateUrl: './delete-button-renderer.component.html',
  styleUrls: ['./delete-button-renderer.component.css'],
})
export class DeleteButtonRendererComponent implements AgRendererComponent {
  constructor(
    private employeeService: EmployeeService,
    private empComp: ListEmployeesComponent,
    private toastr: ToastrService
  ) {}
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}

  private cellValue: any;

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = this.getValueToDisplay(params);
  }

  buttonClicked() {
    this.employeeService.deleteEmployee(this.cellValue.emp_id).subscribe(
      (result) => {
        this.empComp.getEmployees();
        this.toastr.success('Delete Successfull');
      },
      (errors) => {
        this.toastr.success('Delete Successfull', errors);
      }
    );
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted.data : params.data;
  }
}
