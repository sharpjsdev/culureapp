import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikedByPageRoutingModule } from './liked-by-routing.module';

import { LikedByPage } from './liked-by.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikedByPageRoutingModule
  ],
  declarations: [LikedByPage]
})
export class LikedByPageModule {}
