import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';

import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';

import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
