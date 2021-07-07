import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { IonicModule } from '@ionic/angular';

import { CreateBlogPageRoutingModule } from './create-blog-routing.module';

import { CreateBlogPage } from './create-blog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
    IonicModule,
	QuillModule.forRoot({
      modules: {
        syntax: false
      }
    }),
    CreateBlogPageRoutingModule
  ],
  declarations: [CreateBlogPage]
})
export class CreateBlogPageModule {}
