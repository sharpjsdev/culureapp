import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DatePipe } from '@angular/common';
import { MyPostPageRoutingModule } from './my-post-routing.module';
import { TimeAgoPipe} from 'time-ago-pipe';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { MyPostPage } from './my-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    ExploreContainerComponentModule,
	NgxIonicImageViewerModule,
    IonicModule,
    MyPostPageRoutingModule
  ],
  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [MyPostPage,TimeAgoPipe]
})
export class MyPostPageModule {}






