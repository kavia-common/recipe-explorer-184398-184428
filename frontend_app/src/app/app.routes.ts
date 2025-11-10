import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent, title: 'Recipes • Recipe Explorer' },
  { path: 'recipe/:id', component: RecipeDetailComponent, title: 'Recipe Details • Recipe Explorer' },
  { path: 'favorites', component: FavoritesComponent, title: 'Favorites • Recipe Explorer' },
  { path: '**', redirectTo: '' }
];
