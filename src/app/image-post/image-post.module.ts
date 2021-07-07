import { IonicModule } from '@ionic/angular';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DatePipe } from '@angular/common';

import { TimeAgoPipe} from 'time-ago-pipe';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { ImagePostPageRoutingModule } from './image-post-routing.module';
import { ImagePostPage } from './image-post.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
	SharedModule,
    FormsModule,
	ReactiveFormsModule,
    ExploreContainerComponentModule,
    ImagePostPageRoutingModule,
	NgxIonicImageViewerModule

  ],
  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [ImagePostPage,TimeAgoPipe]
})
export class ImagePostPageModule {}
