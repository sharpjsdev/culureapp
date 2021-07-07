import { IonicModule } from '@ionic/angular';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe} from 'time-ago-pipe';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { SharedModule } from '../shared.module';
import { BarRatingModule } from "ngx-bar-rating"; 
import { UserProductsPageRoutingModule } from './user-products-routing.module';
import { UserProductsPage } from './user-products.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
	SharedModule,
	BarRatingModule,
	ReactiveFormsModule,
    ExploreContainerComponentModule,
    UserProductsPageRoutingModule,
	NgxIonicImageViewerModule

  ],
  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [UserProductsPage,TimeAgoPipe]
})
export class UserProductsPageModule {}

