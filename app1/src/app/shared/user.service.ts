import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user } from './user.model';
import { environment } from '../../environments/environment';
import { Router }  from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:user={
    fullname: '',
    _id:' ',
    email:'',
    password:'',
    gender:'',
    dob:'',
    nationality:'',
    aboutme:'',
    favouritebars:['']

    
  };
  

   

  
  
  
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  
  //HttpMethods
  updatefavbar(shopid,uid){
    const issue={
      shopid:shopid
    }
    return this.http.post(environment.apiBaseUrl+`/userprofile/updatefavbar/${uid}`,issue);
  }
  removefavbar(shopid,uid){
    const issue={
      shopid:shopid
    }
    return this.http.post(environment.apiBaseUrl+`/userprofile/removefavbar/${uid}`,issue);
  }
  checkbar(cid,uid){
    const issue={
      uid:uid
    }
    return this.http.post(environment.apiBaseUrl+`/userprofile/findfavbar/${uid}`,issue);
  }

  postUser(user: user){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }
  

  login(authCredentials) {
    // console.log(authCredentials);
    return this.http.post(environment.apiBaseUrl +'/authenticate',authCredentials,this.noAuthHeader);
    
  
  }

  
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userprofile');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  
  
  


  

  
  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }


  
  

}



  


