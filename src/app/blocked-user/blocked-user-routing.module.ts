import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockedUserPage } from './blocked-user.page';

const routes: Routes = [
  {
    path: '',
    component: BlockedUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockedUserPageRoutingModule {}
