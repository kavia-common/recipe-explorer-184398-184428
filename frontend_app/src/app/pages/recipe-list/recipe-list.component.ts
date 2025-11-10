import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { FiltersSidebarComponent } from '../../components/filters-sidebar/filters-sidebar.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [NgFor, RecipeCardComponent, FiltersSidebarComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  constructor(public recipes: RecipeService) {}

  countText(n: number) {
    return `${n} recipe${n === 1 ? '' : 's'}`;
  }
}
