import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from "@angular/router";
import { coffeeshop } from '../shared/coffeeshop.model';
import { CoffeeshopService } from '../shared/coffeeshop.service';
// import { PipeTransform, Pipe } from '@angular/core';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  srchbox:string;
  coffeeDetails: coffeeshop[];
  data;
  id: String;

  constructor(private coffeeshopservice: CoffeeshopService, private router: Router , private route: ActivatedRoute) { }
 
  status=true;
  ngOnInit(): void {

    this.coffeeshopservice.getCoffeeDetailsa().subscribe((coffeeshops) =>{
      // console.log(this.coffeeDetails);
        // console.log(coffeeshops);
        

      }
    )
    this.id=this.route.snapshot.paramMap.get('id');
    this.fetchcoffeeshops();
  }
  fetchcoffeeshops()

  {
    this.coffeeshopservice.getCoffeeDetailsa().subscribe((data:coffeeshop[])=>{
      this.coffeeDetails=data;
      // console.log("send response");
    })
  }
  coffeeshops(id){
    this.router.navigate([`/shopid/${id}`]);
  }
}
