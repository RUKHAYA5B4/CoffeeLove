import { Component, OnInit } from '@angular/core'; 
import { Router , ActivatedRoute} from "@angular/router";
import { coffeeshop } from '../shared/coffeeshop.model';
import { UserService } from '../shared/user.service';

import * as L from 'leaflet';
import { CoffeeshopService } from '../shared/coffeeshop.service';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import  MapboxDirections  from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mainshop',
  templateUrl: './mainshop.component.html',
  styleUrls: ['./mainshop.component.css']
})
export class MainshopComponent implements OnInit {

  coffeeDetails: coffeeshop;
  data;
  _id: String;
  id:string;
  position:{};
  showSucessMessage: boolean;
  serverErrorMessages: string;
  userDetails:any;
  reviewlayout:any;
  isCollapsed:boolean=true;
  currentusername:string;
  reviews:[string];
  reiewlayout:any;

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0;
  showTicks = false;
  step = 0.1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  tickInterval = 1;


  


  constructor(private userService: UserService,public coffeeshopservice: CoffeeshopService, private router: Router , private snackBar: MatSnackBar, private route: ActivatedRoute) { }
  
  srchbox;
  status=true;
  ngOnInit(): void {


    this.coffeeshopservice.getCoffeeDetailsa().subscribe((coffeshops) =>{
        // console.log(coffeshops);

      }
    )
    this.id=this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.fetchcoffeeshops();
    this.userDetails=this.userService.getUserProfile();
    // console.log(this.userDetails);
    this.refreshReviewList();
    this.resetForm();

    }

    refreshReviewList() {
      this.coffeeshopservice.coffeeshops(this.id).subscribe((res) => {
        this.coffeeDetails = res as coffeeshop;
      });
    }


    addreview(coffeeDetails,currentusername,reviews){
    // console.log("bai")
      this.coffeeshopservice.addreview(coffeeDetails,currentusername,reviews).subscribe(data =>{
        // console.log(data);
        this.snackBar.open('Review Added Successfully', 'OK', {duration: 7000});
        this.refreshReviewList();
        this.ngOnInit();
        
      }),(err)=>{
        // console.log(err);
        this.snackBar.open('Could not able to Add Review, Try again Later', 'OK', {duration: 7000});
      }
    }

    rateadd(value,shopid){ 
      // console.log('print');
      // console.log(value,shopid);
      this.coffeeshopservice.addrate(value,shopid).subscribe(data =>{
        // console.log(data)
        this.snackBar.open('Rated Successfull', 'OK', {duration: 7000});
        this.refreshReviewList();
      }),(err)=>{
        // console.log(err);
        this.snackBar.open('Could not able to rate, Try again Later', 'OK', {duration: 7000});
      }
    }
    getSliderTickInterval(): number | 'auto' {
      if (this.showTicks) {
        return this.autoTicks ? 'auto' : this.tickInterval;
      }
    
      return 0;
    }
    resetForm(form?: NgForm) {
      if (form)
        form.reset();
   
    }
    
    
  

  
    
  

    
  
  fetchcoffeeshops()
  {
    this.coffeeshopservice.coffeeshops(this.id).subscribe((data:coffeeshop)=>{
      this.coffeeDetails=data;
      this.reiewlayout=this.coffeeDetails.reviews;
      // console.log(this.coffeeDetails.latitude);
      // console.log("send response");
      mapboxgl.accessToken = 'pk.eyJ1Ijoic3VoZWFia2hhbiIsImEiOiJjazk4ZjQ0aWwwMTBmM2VwMGZiemtqdjd0In0.egB0NFqMkQjD-6Vy2GnBUA';
      const map = new mapboxgl.Map({
     container: 'map',
     style: 'mapbox://styles/mapbox/streets-v11',
     zoom:15,
     center:[78.5010,13.5560],
     

});
var marker=new mapboxgl.Marker()
.setLngLat([this.coffeeDetails.longitude,this.coffeeDetails.latitude])
.addTo(map)

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions:{
      enableHighAccuracy: true
    },
  })
);
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(
  new MapboxDirections({
    accessToken:mapboxgl.accessToken
  }),
  'top-left'
);
  

  })
}
}



  
      



  
    

  
   

  


