import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFountComponent } from './Components/page-not-fount/page-not-fount.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginGuardGuard } from './AuthGourds/login-guard.guard';

const routes: Routes = [{ path: '', loadChildren: () => import('./Pages/home/home.module').then(m => m.HomeModule),canActivate:[LoginGuardGuard] }, 
{ path: 'Blog', loadChildren: () => import('./Pages/blog/blog.module').then(m => m.BlogModule) ,canActivate:[LoginGuardGuard]},
{
  path:'Login',component:LoginComponent
},
{
  path:'SignUp',component:SignUpComponent
},
{path:'**',component:PageNotFountComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
