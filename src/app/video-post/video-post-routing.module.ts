import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoPostPage } from './video-post.page';

const routes: Routes = [
  {
    path: '',
    component: VideoPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoPostPageRoutingModule {}
