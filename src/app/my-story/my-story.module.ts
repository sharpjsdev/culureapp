import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyStoryPageRoutingModule } from './my-story-routing.module';

import { MyStoryPage } from './my-story.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyStoryPageRoutingModule
  ],
  declarations: [MyStoryPage]
})
export class MyStoryPageModule {}
