import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from "@angular/router";
import * as mapboxgl from 'mapbox-gl';
import  MapboxDirections  from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-locatecafe',
  templateUrl: './locatecafe.component.html',
  styleUrls: ['./locatecafe.component.css']
})
export class LocatecafeComponent implements OnInit {
  


constructor() { }

ngOnInit(): void {
mapboxgl.accessToken = 'pk.eyJ1Ijoic3VoZWFia2hhbiIsImEiOiJjazk4ZjQ0aWwwMTBmM2VwMGZiemtqdjd0In0.egB0NFqMkQjD-6Vy2GnBUA';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom:15,
center:[78.5010,13.5560],

});
// console.log("hi")
async function getStores(){
    // console.log("hai")
    const res = await fetch(environment.apiBaseUrl+'/location');
    const data= await res.json();
    // console.log(data);

    const stores=data.data.map(store=>{
        return{
            type:'Feature',
            geometry:{
                type:'Point',
                coordinates:[store.location.coordinates[0],store.location.coordinates[1]]
            },
            properties:{
                name:store.name,
                description:store.description +'<br><a href="/homepage">click here</a><br>',
                address:store.address,
                icon:'cafe'
            },
            layout:{
                'icon-image':'{icon}-15',
                'icon-size':1.5,
                'text-field':'{name}',
                'text-offset':[0, 0.9],
                'text-anchor':'top'
            }
        }
    })
    loadMap(stores);
}
function loadMap(stores){
    map.on('load', function() {
        map.addLayer({
            id:'points',
            type:'symbol',
            source:{
                type:'geojson',
                data:{
                    type:'FeatureCollection',
                    features:stores
                   
                }
            },
            layout:{
                'icon-image':'{icon}-15',
                'icon-size':1.5,
                'text-field':'{name}',
                'text-offset':[0, 0.9],
                'text-anchor':'top'
            }
            
    });
    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
      });
       
      map.on('mouseenter', 'points', function(e) {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';
       
      var coordinates = e.features[0].geometry.coordinates.slice();
      var p = e.features[0].properties;
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      popup
      .setLngLat(coordinates)
      .setHTML(p.description)
      .addTo(map);
      });
       
      map.on('mouseleave', 'places', function() {
      map.getCanvas().style.cursor = '';
      popup.remove();
      });
     });

}
 getStores();
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
 
  }

}
