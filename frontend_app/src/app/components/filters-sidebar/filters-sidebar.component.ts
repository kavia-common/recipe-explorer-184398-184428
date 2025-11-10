import { Component, effect, signal, computed } from '@angular/core';
import { NgFor } from '@angular/common';
import { RecipeService, SortOption } from '../../services/recipe.service';

@Component({
  selector: 'app-filters-sidebar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.css'
})
export class FiltersSidebarComponent {
  // compute after service inject
  categories = computed(() => this.recipes.categories());
  dietary = computed(() => this.recipes.dietaryTags());
  difficulties = computed(() => this.recipes.difficulties());

  selectedCategories = signal<string[]>([]);
  selectedDietary = signal<string[]>([]);
  selectedDifficulty = signal<string[]>([]);
  maxTime = signal<number | undefined>(undefined);
  sortBy = signal<SortOption>('rating_desc');

  constructor(public recipes: RecipeService) {
    const f = this.recipes.filters();
    this.selectedCategories.set(f.categories);
    this.selectedDietary.set(f.dietary);
    this.selectedDifficulty.set(f.difficulty);
    this.maxTime.set(f.maxTime);
    this.sortBy.set(f.sortBy);

    effect(() => {
      this.recipes.updateFilters({
        categories: this.selectedCategories(),
        dietary: this.selectedDietary(),
        difficulty: this.selectedDifficulty(),
        maxTime: this.maxTime(),
        sortBy: this.sortBy(),
      });
    });
  }

  toggle(arrSig: ReturnType<typeof signal<string[]>>, value: string) {
    const arr = new Set(arrSig());
    if (arr.has(value)) arr.delete(value); else arr.add(value);
    arrSig.set(Array.from(arr));
  }

  onMaxTimeInput(ev: Event) {
    const v = (ev.target as HTMLInputElement | null)?.value ?? '';
    const n = Number(v);
    this.maxTime.set(isNaN(n) || !v ? undefined : n);
  }

  clearAll() {
    this.recipes.clearFilters();
    const f = this.recipes.filters();
    this.selectedCategories.set(f.categories);
    this.selectedDietary.set(f.dietary);
    this.selectedDifficulty.set(f.difficulty);
    this.maxTime.set(f.maxTime);
    this.sortBy.set(f.sortBy);
  }
}
