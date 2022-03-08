import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recepies',
    children:[
      {
        path:'',
        loadChildren: () => import('./recepies/recepies.module').then( m => m.RecepiesPageModule)
      },
      {
        path:':receipeId',
        loadChildren: () => import('./recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)
      }
    ]
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then( m => m.EmployeePageModule)
  },

  {
    path: 'account',
    children:[
      {
        path:'login',
        loadChildren: () => import('./account/login/login.module').then( m => m.LoginPageModule)   
      },
      {
        path:'register',
        loadChildren: () => import('./account/register/register.module').then( m => m.RegisterPageModule)
      
      }
    ]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
