import { IonicModule } from '@ionic/angular';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { DatePipe } from '@angular/common';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TimeAgoPipe} from 'time-ago-pipe';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { SharedModule } from '../shared.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
	SharedModule,
	ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
	NgxIonicImageViewerModule

  ],
  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [Tab1Page,TimeAgoPipe]
})
export class Tab1PageModule {}
