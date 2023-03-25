import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogSinglePageComponent } from './blog-single-page/blog-single-page.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BlogComponent,
    BlogSinglePageComponent,
    CreateBlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    HttpClientModule,
    AngularEditorModule,
    ReactiveFormsModule,

  ]
})
export class BlogModule { }
