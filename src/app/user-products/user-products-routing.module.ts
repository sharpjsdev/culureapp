import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProductsPage } from './user-products.page';

const routes: Routes = [
  {
    path: '',
    component: UserProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProductsPageRoutingModule {}
