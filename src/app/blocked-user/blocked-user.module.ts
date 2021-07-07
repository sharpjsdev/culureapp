import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlockedUserPageRoutingModule } from './blocked-user-routing.module';

import { BlockedUserPage } from './blocked-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlockedUserPageRoutingModule
  ],
  declarations: [BlockedUserPage]
})
export class BlockedUserPageModule {}
