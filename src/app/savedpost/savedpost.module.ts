import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { IonicModule } from '@ionic/angular';

import { SavedpostPageRoutingModule } from './savedpost-routing.module';

import { SavedpostPage } from './savedpost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedpostPageRoutingModule,
	NgxIonicImageViewerModule
  ],
  declarations: [SavedpostPage]
})
export class SavedpostPageModule {}
