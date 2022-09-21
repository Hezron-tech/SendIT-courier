import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CustomDirective } from './Directives/custom.directive';

@NgModule({
  declarations: [ErrorComponent, MapComponent, CustomDirective],
  imports: [CommonModule, GoogleMapsModule],
  exports: [ErrorComponent,MapComponent],
})
export class SharedModule {}
