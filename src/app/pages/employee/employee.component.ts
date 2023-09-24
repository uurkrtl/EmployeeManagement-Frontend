import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeId: number;
  employeeFirstName:string;
  employeeLastName:string;
  employeeDepartment:string;
  employeePhone:string;
  
  employeeForm: FormGroup;
  errorMessage: string="";
  successMessage: string="";
  isDelete: boolean;

  constructor(private route:ActivatedRoute, private formBuilder:FormBuilder, private employeeService:EmployeeService){}


  ngOnInit(): void {
    this.employeeId=this.route.snapshot.queryParamMap.get('employeeId') as unknown as number;
    this.isDelete=this.route.snapshot.queryParamMap.get('delete') as unknown as boolean;
    this.createEmployeeForm();
    if(this.employeeId>0) this.getByIdEmployee(this.employeeId);
  }

  createEmployeeForm(){
    this.employeeForm = this.formBuilder.group({
      id:this.employeeId,
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      department: ["", Validators.required],
      phone: ["", Validators.required],
    })
  }

  addEmployee(){
    if(this.employeeForm.valid){
      let employeeModel = Object.assign({},this.employeeForm.value)
      this.employeeService.addEmployee(employeeModel).subscribe(response=>{
        console.log(this.employeeForm.value)
        console.log(response)
        this.errorMessage=""
        this.successMessage="The Employee has been successfully added"
      },responseError=>{
        this.errorMessage=responseError.error.message
        console.log(this.errorMessage)
        this.successMessage=""
      })
    }else{
      console.log("Could not add Employee")
    }
  }

  deleteEmployee(employeeId:number){
    this.employeeService.deleteEmployee(employeeId).subscribe(response=>{
      console.log(response)
      this.errorMessage=""
      this.successMessage="The Employee has been successfully deleted"
    },responseError=>{
      this.errorMessage=responseError.error.message
      console.log(this.errorMessage)
      this.successMessage=""
    })
  }

  getByIdEmployee(employeeId:number){
    this.employeeService.getEmployeeById(employeeId).subscribe(response=>{
      this.employeeFirstName=response.firstName;
      this.employeeLastName=response.lastName;
      this.employeeDepartment=response.department;
      this.employeePhone=response.phone;
    })
  }

  updateEmployee(){
    if(this.employeeForm.valid){
      let employeeModel = Object.assign({},this.employeeForm.value)
      this.employeeService.updateEmployee(employeeModel).subscribe(response=>{
        console.log(this.employeeForm.value)
        console.log(response)
        this.errorMessage=""
        this.successMessage="The Employee has been successfully updated"
      },responseError=>{
        this.errorMessage=responseError.error.message
        console.log(this.errorMessage)
        this.successMessage=""
      })
    }else{
      console.log("Could not update Employee")
    }
  }

}