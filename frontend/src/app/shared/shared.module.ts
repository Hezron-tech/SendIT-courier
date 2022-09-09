import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { MapComponent } from './map/map.component';



@NgModule({
  declarations: [
    ErrorComponent,
    MapComponent
  ],
  imports: [
    CommonModule],
  exports: [
    ErrorComponent,
   
  ]
})
export class SharedModule { }
