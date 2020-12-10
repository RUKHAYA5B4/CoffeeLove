import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  

  constructor(private userService: UserService,private router : Router) { }
 model ={
  //   email :'',
 password:''
   };

  ngOnInit(){
    
}
onSubmit(form : NgForm){
  if(form.value.password =="12345"){
    this.router.navigateByUrl('/admin');
  }
}
  



}
