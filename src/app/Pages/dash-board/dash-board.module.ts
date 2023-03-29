import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FamilyComponent } from './family/family.component';
import { StoryComponent } from './story/story.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    AboutComponent,
    GalleryComponent,
    FamilyComponent,
    StoryComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule
  ]
})
export class DashBoardModule { }
