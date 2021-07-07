import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowBlogPage } from './show-blog.page';

const routes: Routes = [
  {
    path: '',
    component: ShowBlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowBlogPageRoutingModule {}
