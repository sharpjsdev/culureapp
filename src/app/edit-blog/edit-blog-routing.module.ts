import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBlogPage } from './edit-blog.page';

const routes: Routes = [
  {
    path: '',
    component: EditBlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBlogPageRoutingModule {}
