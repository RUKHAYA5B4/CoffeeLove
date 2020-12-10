import { PipeTransform, Pipe } from '@angular/core';
import { coffeeshop } from '../shared/coffeeshop.model';
 import { filter } from 'rxjs/operators';

@Pipe({
    name: 'cafeeFilter',
    pure: true,
})
export class HomePageFilterPipe implements PipeTransform{
    transform(coffeeDetails:coffeeshop[],srchbx: string):coffeeshop[]{
        if(!coffeeDetails || !srchbx){
            return coffeeDetails;

        }
        return coffeeDetails.filter(coffee => coffee.name.toLowerCase().indexOf(srchbx.toLowerCase())!==-1);
    }
}