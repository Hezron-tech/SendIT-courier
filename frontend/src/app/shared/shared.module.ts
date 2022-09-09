import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [ErrorComponent, MapComponent],
  imports: [CommonModule, GoogleMapsModule],
  exports: [ErrorComponent],
})
export class SharedModule {}
