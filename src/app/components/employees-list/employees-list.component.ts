import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {
  employees: Employee[] = [];

  constructor(private employeeService:EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(response=>{
      this.employees = response;
    })
  }

}
