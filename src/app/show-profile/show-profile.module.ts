import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { IonicModule } from '@ionic/angular';

import { ShowProfilePageRoutingModule } from './show-profile-routing.module';

import { ShowProfilePage } from './show-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	NgxIonicImageViewerModule,
    ShowProfilePageRoutingModule
  ],
  declarations: [ShowProfilePage]
})
export class ShowProfilePageModule {}
