import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgIf, NgFor, RecipeCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  constructor(public recipes: RecipeService) {}
}
