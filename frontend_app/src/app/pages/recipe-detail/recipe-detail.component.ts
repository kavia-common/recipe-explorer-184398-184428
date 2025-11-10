import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RecipeCardComponent],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  private route = inject(ActivatedRoute);
  constructor(public recipes: RecipeService) {}

  private idSig = signal<string | null>(this.route.snapshot.paramMap.get('id'));

  recipe = computed<Recipe | undefined>(() => {
    const id = this.idSig();
    return id ? this.recipes.getById(id) : undefined;
  });

  similar = computed<Recipe[]>(() => {
    const r = this.recipe();
    if (!r || !r.similarIds?.length) return [];
    return r.similarIds.map(id => this.recipes.getById(id)).filter(Boolean) as Recipe[];
  });

  totalTime(r?: Recipe) { return r ? r.prepTime + r.cookTime : 0; }

  toggleFavorite(id: string) { this.recipes.toggleFavorite(id); }
}
