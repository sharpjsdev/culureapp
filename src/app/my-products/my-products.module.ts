import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe} from 'time-ago-pipe';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { MyProductsPageRoutingModule } from './my-products-routing.module';
import { MyProductsPage } from './my-products.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    ExploreContainerComponentModule,
    IonicModule,
	SharedModule,
    MyProductsPageRoutingModule,
	NgxIonicImageViewerModule
  ],
  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [MyProductsPage,TimeAgoPipe]
})
export class MyProductsPageModule {}




