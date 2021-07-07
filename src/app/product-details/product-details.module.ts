import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { BarRatingModule } from "ngx-bar-rating"; 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	BarRatingModule,
    IonicModule,
	ReactiveFormsModule,
	NgxIonicImageViewerModule,
    ProductDetailsPageRoutingModule
  ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ], 
  declarations: [ProductDetailsPage]
})
export class ProductDetailsPageModule {}
