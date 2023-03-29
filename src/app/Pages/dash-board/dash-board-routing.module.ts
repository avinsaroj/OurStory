import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FamilyComponent } from './family/family.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [{ path: '', component: DashBoardComponent },
{ path: 'About', component: AboutComponent },
{ path: 'Header', component: HeaderComponent },
{ path: 'Family', component: FamilyComponent },
{ path: 'Gallery', component: GalleryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
