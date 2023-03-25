import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogSinglePageComponent } from './blog-single-page/blog-single-page.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

const routes: Routes = [{ path: '', component: BlogComponent },
{path: 'BlogSinglePage/:Id', component: BlogSinglePageComponent },
{path: 'Blogwrite', component: CreateBlogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
