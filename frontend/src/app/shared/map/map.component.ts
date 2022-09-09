import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  

  constructor(private map: google.maps.Map) { }

  ngOnInit(): void {

    // let loader = new Loader(
    //   {
    //     apiKey:'AIzaSyAOFp0IlAypbayETY9K03i9nFpbqFNM_Uo'
    //   }
    // ); 
  }
  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 24,
      lng: 12
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

}
