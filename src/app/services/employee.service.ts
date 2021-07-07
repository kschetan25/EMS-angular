import { Injectable } from '@angular/core';
import { Employee } from '../Entity/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/employees');
  }

  public saveEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/employees', employee);
  }

  public getEmployee(emp_id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/employees/' + emp_id);
  }

  public deleteEmployee(emp_id: number): Observable<any> {
    console.log('inDelete', emp_id);
    return this.http.delete(this.apiUrl + '/employees/' + emp_id);
  }

  public updateEmployee(employees: any[]): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/employees', employees);
  }
}
