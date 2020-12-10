import { Injectable } from '@angular/core';
import { coffeeshop } from './coffeeshop.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router }  from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CoffeeshopService {
  coffeeshop={
    name:' ',
    email:' ',
    contactnumber:' ',
    _id:' ',
    timings:' ',
    description: ' ',
    menu:' ',
    tagline: ' ',
    address:' ',
    ratings: ' ',
    reviews: ' ',
    specials:' ',
    longitude:' ',
    latitude: ' '
    

  };
  


  constructor(private http: HttpClient) { }

  getCoffeeDetailsa(){
    return this.http.get(environment.apiBaseUrl + '/shopall');
  }

  coffeeshops(id){
    return this.http.get(environment.apiBaseUrl+`/shopid/${id}`);

  }
  
  addreview(sid,uname,review){
    const issue={
      
      fullname:uname,
      reviews:review,
    }
    return this.http.post(environment.apiBaseUrl+`/updatereview/${sid}`,issue);
  }

  addrate(value,shopid){
    const issue={
      value:value
    }
    return this.http.post(environment.apiBaseUrl+`/addrating/${shopid}`,issue);
  }
}




