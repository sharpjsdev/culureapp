import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedByPage } from './liked-by.page';

const routes: Routes = [
  {
    path: '',
    component: LikedByPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedByPageRoutingModule {}
