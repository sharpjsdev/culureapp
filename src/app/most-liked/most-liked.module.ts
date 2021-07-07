import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MostLikedPageRoutingModule } from './most-liked-routing.module';
import { TimeAgoPipe} from 'time-ago-pipe';
import { MostLikedPage } from './most-liked.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    IonicModule,
	ExploreContainerComponentModule,
	NgxIonicImageViewerModule,
    MostLikedPageRoutingModule
  ],  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [MostLikedPage,TimeAgoPipe]
})
export class MostLikedPageModule {}




