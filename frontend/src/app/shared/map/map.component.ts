import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Loader } from '@googlemaps/js-api-loader';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {

  }
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  center: google.maps.LatLngLiteral = {
      lat: 1.2921,
      lng: 36.8219
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 8;
  addMarker(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
  openInfoWindow(marker: MapMarker) {
      if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }

}
