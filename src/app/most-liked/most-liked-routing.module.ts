import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostLikedPage } from './most-liked.page';

const routes: Routes = [
  {
    path: '',
    component: MostLikedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostLikedPageRoutingModule {}
