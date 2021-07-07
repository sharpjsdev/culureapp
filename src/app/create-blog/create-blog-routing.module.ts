import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBlogPage } from './create-blog.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBlogPageRoutingModule {}
