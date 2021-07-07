import { IonicModule } from '@ionic/angular';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DatePipe } from '@angular/common';

import { TimeAgoPipe} from 'time-ago-pipe';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { VideoPostPageRoutingModule } from './video-post-routing.module';
import { VideoPostPage } from './video-post.page';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
	SharedModule,
	ReactiveFormsModule,
    ExploreContainerComponentModule,
    VideoPostPageRoutingModule,
	NgxIonicImageViewerModule

  ],
  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [VideoPostPage,TimeAgoPipe]
})
export class VideoPostPageModule {}
