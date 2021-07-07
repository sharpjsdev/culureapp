import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe} from 'time-ago-pipe';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { ShowBlogPageRoutingModule } from './show-blog-routing.module';
import { ShowBlogPage } from './show-blog.page';
import { SharedModule } from '../shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    ExploreContainerComponentModule,
    IonicModule,
	SharedModule,
	NgxIonicImageViewerModule,
	ShowBlogPageRoutingModule
  ],
  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [ShowBlogPage,TimeAgoPipe]
})
export class ShowBlogPageModule {}





