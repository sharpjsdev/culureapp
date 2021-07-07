import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ShopHeaderComponent } from './shop-header/shop-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent,ShopHeaderComponent],
  imports: [
    CommonModule,
	RouterModule
  ],
  exports: [
    HeaderComponent,
    ShopHeaderComponent,
  ]
})
export class SharedModule { }
