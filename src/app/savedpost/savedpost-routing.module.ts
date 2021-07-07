import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedpostPage } from './savedpost.page';

const routes: Routes = [
  {
    path: '',
    component: SavedpostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedpostPageRoutingModule {}
