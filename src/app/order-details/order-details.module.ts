import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { OrderDetailsPageRoutingModule } from './order-details-routing.module';
import { OrderDetailsPage } from './order-details.page';
import { BarRatingModule } from "ngx-bar-rating"; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	BarRatingModule,
    IonicModule,
	ReactiveFormsModule,
	NgxIonicImageViewerModule,
    OrderDetailsPageRoutingModule
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ], 
  declarations: [OrderDetailsPage]
})
export class OrderDetailsPageModule {}
