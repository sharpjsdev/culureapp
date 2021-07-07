import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyStoryPage } from './my-story.page';

const routes: Routes = [
  {
    path: '',
    component: MyStoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyStoryPageRoutingModule {}
