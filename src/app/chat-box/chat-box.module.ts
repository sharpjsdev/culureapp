import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ChatBoxPageRoutingModule } from './chat-box-routing.module';

import { ChatBoxPage } from './chat-box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    IonicModule,
    ChatBoxPageRoutingModule
  ],
  providers: [
    DatePipe,
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
  declarations: [ChatBoxPage]
})
export class ChatBoxPageModule {}
