import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  constructor(public recipes: RecipeService) {}

  totalTime(r: Recipe) {
    return r.prepTime + r.cookTime;
  }

  toggleFavorite(ev: Event, id: string) {
    ev.preventDefault();
    ev.stopPropagation();
    this.recipes.toggleFavorite(id);
  }
}
