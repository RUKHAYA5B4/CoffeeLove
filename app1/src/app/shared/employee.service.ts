import { Injectable } from '@angular/core';
import  {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router }  from '@angular/router';

import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];


  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    
    return this.http.post(environment.apiBaseUrl+'/shopdata', emp);
  }

  getEmployeeList() {
    
   return this.http.get(environment.apiBaseUrl+'/shopall');  
  }

  putEmployee(emp: Employee) {
    return this.http.put(environment.apiBaseUrl+ `/adminupd/${emp._id}`,emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(environment.apiBaseUrl+ `/admindel/${_id}`);
  }

}

