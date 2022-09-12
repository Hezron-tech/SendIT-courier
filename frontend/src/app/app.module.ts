import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { GoogleMapsModule } from '@angular/google-maps';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffectsService } from './Modules/admin/Redux/Effects/order-effects.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { environment } from 'src/environments/environment';
// import { OrderEffectsService } from './Modules/admin/Redux/Effects/order-effects.service';
// import { OrderReducer } from './Modules/admin/Redux/Reducers/orderReducer';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent, HomepageComponent, NavbarComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    GoogleMapsModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    
   
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
