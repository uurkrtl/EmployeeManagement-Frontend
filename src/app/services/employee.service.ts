import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl = "http://eagle-employee-management.eu-central-1.elasticbeanstalk.com/api/";

  constructor(private httpClient: HttpClient) { }


  getEmployees():Observable<Employee[]>{
    let newPath = this.apiUrl+"employees";
    return this.httpClient.get<Employee[]>(newPath)
  }

  addEmployee(employee:Employee){
    let newPath = this.apiUrl+"employees/add";
    return this.httpClient.post(newPath,employee)
  }

  updateEmployee(employee:Employee){
    let newPath = this.apiUrl+"employees/update";
    return this.httpClient.put(newPath,employee)
  }

  deleteEmployee(employeeId:number){
    let newPath = this.apiUrl+"employees/delete?id=" + employeeId;
    return this.httpClient.delete<Employee>(newPath)
  }

  getEmployeeById(employeeId:number){
    let newPath = this.apiUrl+"employees/getById?id=" + employeeId;
    return this.httpClient.get<Employee>(newPath)
  }
  
}