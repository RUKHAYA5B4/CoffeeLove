import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { user } from '../shared/user.model';
import { CoffeeshopService } from '../shared/coffeeshop.service';
import { coffeeshop } from '../shared/coffeeshop.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  // signUp:user;
  issuebar:coffeeshop[];
  cid:String;
  uid:String;
  userid:String;
  constructor(public coffeeshopservice: CoffeeshopService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        // console.log(res);
        this.userDetails = res['user'];

      },
      err => { 
        // console.log(err);
        
      }
    );
    this.fetchIssuesbar();
    this.updatefavbar(this.cid,this.uid);
    this.removefavbar(this.cid,this.uid);
  
    
  }
  fetchIssuesbar(){
    this.coffeeshopservice.getCoffeeDetailsa()
    .subscribe((data:coffeeshop[])=>{
      this.issuebar=data;
      // console.log('Data requested....');
      // console.log(this.issuebar);
    });
  }
   favChanged(cid,uid,event){
    // console.log('CID=',cid,' uid=',uid);
    // console.log(event.checked);
    if (event.checked ==  true){
     
      this.updatefavbar(cid,uid)
      // console.log("added model success");
      // this.ngOnInit(); 
    }
    else{      
      // console.log("removed model success")
      this.removefavbar(cid,uid) 
      this.ngOnInit();
    }    
  }
  updatefavbar(cid,uid){
    this.userService.updatefavbar(cid,uid).subscribe(data =>{
      // console.log(data)
    }),(err)=>{
      // console.log(err);
    }
  }
  removefavbar(cid,uid){
    this.userService.removefavbar(cid,uid).subscribe(data =>{
      // console.log(data)
    }),(err)=>{
      // console.log(err); 
    }
  }
  
  checkedfunction(cid){
    // console.log(this.userDetails.favouritebars);
    let arraydata=this.userDetails.favouritebars;
    for (var i = 0; i < Object.keys(arraydata).length; i++) {
      if(arraydata[i]==cid){
        return true;
      }
    }    
  }
  tracByBarId(index:number, element:any){
    return element._id;
  }
  
    

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/masterpage']);
  }

}
