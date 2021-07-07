import { DeleteButtonRendererComponent } from './../../renderers/delete-button-renderer/delete-button-renderer.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { Employee } from 'src/app/Entity/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { formatDate } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
})
export class ListEmployeesComponent implements OnInit {
  public employees: Employee[];
  public selectedEmployee: Employee;
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  upserData: Employee[] = [];
  disableDelete: boolean;
  deleteData: Number[] = [];
  maxDate: any;

  constructor(
    private empService: EmployeeService,
    private toast: ToastrService
  ) {
    console.log(this.maxDate);
  }

  frameworkComponents = {
    deleteRenderer: DeleteButtonRendererComponent,
  };

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
    floatingFilter: true,
    // headerCheckboxSelection: this.isFirstColumn,
    // checkboxSelection: this.isFirstColumn,
  };
  components = {
    // datePicker: getDatePicker(),
  };
  gridOptions = {
    domLayout: 'autoHeight',
    columnDefs: this.createColumnDefs(),
    defaultColDef: this.defaultColDef,
    rowSelection: 'multiple',
    isRowSelectable: function (rowNode) {
      return true;
    },
  };
  editType = 'fullRow';
  rowData = [];
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

  ngOnInit(): void {
    this.disableDelete = true;
    this.getEmployees();
  }

  createColumnDefs() {
    return [
      { field: 'firstName', headerName: 'First Name' },
      { field: 'lastName', headerName: 'Last Name' },
      { field: 'email', headerName: 'Email' },
      { field: 'phoneNumber', headerName: 'Phone', filter: false },
      {
        field: 'dateOfBirth',
        headerName: 'Date Of Birth',
        filter: false,
      },
      {
        field: 'dateOfBirth',
        headerName: 'Date Of Join',
        filter: false,
      },
      {
        field: '',
        headerName: 'Action',
        cellRenderer: 'deleteRenderer',
        filter: false,
        editable: false,
      },
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  isFirstColumn(params) {
    var displayedColumns = params.columnApi.getAllDisplayedColumns();
    var thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }

  onRowSelected(params) {
    this.disableDelete =
      this.gridApi.getSelectedNodes().length > 0 ? false : true;
  }

  onPageSizeChanged(newPageSize) {
    this.gridApi.paginationSetPageSize(Number(newPageSize));
  }

  onCellValueChanged(params) {
    params.data.action = 'u';
  }

  getEmployeesList() {
    this.gridApi.forEachNode((node) => {
      if (node.data.action === 'u') {
        this.upserData.push(node.data);
      }
    });
  }

  public saveEmployee() {
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
        this.getEmployees();
        this.toast.success('Save Success');
      },
      (errors: HttpErrorResponse) => {
        this.toast.success('Something Went Wrong', errors.message);
      }
    );
  }

  cancelAdd() {
    this.getEmployees();
  }

  public getEmployees(): any {
    this.empService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.rowData = response;
      },
      (errors: HttpErrorResponse) => {
        this.toast.success('Something Went Wrong', errors.message);
      }
    );
  }

  public updateEmployee() {
    this.getEmployeesList();
    this.empService.updateEmployee(this.upserData).subscribe(
      (response) => {
        this.upserData = [];
        this.getEmployees();
        this.toast.success('Update Success');
      },
      (errors: HttpErrorResponse) => {
        this.toast.success('Something Went Wrong', errors.message);
      }
    );
  }
}
