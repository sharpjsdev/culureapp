import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBlogsPage } from './my-blogs.page';

const routes: Routes = [
  {
    path: '',
    component: MyBlogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBlogsPageRoutingModule {}
