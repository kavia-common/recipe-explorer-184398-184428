import { Injectable, signal, computed } from '@angular/core';
import { MOCK_RECIPES } from '../data/mock-recipes';
import { Recipe } from '../models/recipe.model';
import { EnvService } from './env.service';

export type SortOption = 'rating_desc' | 'time_asc';

export interface FilterState {
  query: string;
  categories: string[];
  dietary: string[];
  difficulty: string[];
  maxTime?: number; // total time (prep + cook)
  sortBy: SortOption;
}

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly lsKey = 'rx_favorites_v1';

  private allRecipes = signal<Recipe[]>([]);
  private favoritesIds = signal<Set<string>>(new Set());

  filters = signal<FilterState>({
    query: '',
    categories: [],
    dietary: [],
    difficulty: [],
    sortBy: 'rating_desc',
  });

  // Derived signals
  recipes = computed<Recipe[]>(() => this.allRecipes());
  favorites = computed<Recipe[]>(() => this.allRecipes().filter(r => this.favoritesIds().has(r.id)));

  filtered = computed<Recipe[]>(() => {
    const f = this.filters();
    const q = f.query.trim().toLowerCase();
    let items = [...this.allRecipes()];

    if (q) {
      items = items.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.toLowerCase().includes(q))
      );
    }

    if (f.categories.length) {
      items = items.filter(r => f.categories.includes(r.category));
    }

    if (f.dietary.length) {
      items = items.filter(r => f.dietary.every(tag => r.dietary.includes(tag)));
    }

    if (f.difficulty.length) {
      items = items.filter(r => f.difficulty.includes(r.difficulty));
    }

    if (typeof f.maxTime === 'number') {
      items = items.filter(r => (r.prepTime + r.cookTime) <= (f.maxTime as number));
    }

    // Sorting
    if (f.sortBy === 'rating_desc') {
      items.sort((a, b) => b.rating - a.rating);
    } else if (f.sortBy === 'time_asc') {
      items.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
    }

    return items;
  });

  categories = computed<string[]>(() => {
    return Array.from(new Set(this.allRecipes().map(r => r.category))).sort();
  });

  dietaryTags = computed<string[]>(() => {
    const tags = new Set<string>();
    this.allRecipes().forEach(r => r.dietary.forEach(d => tags.add(d)));
    return Array.from(tags).sort();
  });

  difficulties = computed<string[]>(() => ['Easy', 'Medium', 'Hard']);

  constructor(private env: EnvService) {
    // Load recipes (mock for now, structure ready for future REST)
    if (this.env.useMock) {
      this.allRecipes.set(MOCK_RECIPES);
    } else {
      // Placeholder for future HTTP fetch:
      // this.http.get<Recipe[]>(`${this.env.apiBase}/recipes`).subscribe(data => this.allRecipes.set(data));
      this.allRecipes.set(MOCK_RECIPES);
    }

    // Load favorites from localStorage
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(this.lsKey) : null;
    try {
      const parsed: string[] | null = raw ? JSON.parse(raw) : null;
      if (parsed && Array.isArray(parsed)) {
        this.favoritesIds.set(new Set(parsed));
      }
    } catch {
      this.favoritesIds.set(new Set());
    }
  }

  private persistFavorites() {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(this.lsKey, JSON.stringify(Array.from(this.favoritesIds())));
  }

  // PUBLIC_INTERFACE
  getById(id: string): Recipe | undefined {
    /** Returns a single recipe by id, or undefined if not found. */
    return this.allRecipes().find(r => r.id === id);
  }

  // PUBLIC_INTERFACE
  toggleFavorite(id: string): void {
    /** Toggles favorite state for a recipe and persists to localStorage. */
    const set = new Set(this.favoritesIds());
    if (set.has(id)) set.delete(id); else set.add(id);
    this.favoritesIds.set(set);
    this.persistFavorites();
  }

  // PUBLIC_INTERFACE
  isFavorite(id: string): boolean {
    /** Returns true if recipe id is in favorites set. */
    return this.favoritesIds().has(id);
  }

  // PUBLIC_INTERFACE
  clearFilters(): void {
    /** Reset all filters to defaults except sortBy. */
    const current = this.filters();
    this.filters.set({ query: '', categories: [], dietary: [], difficulty: [], sortBy: current.sortBy, maxTime: undefined });
  }

  // PUBLIC_INTERFACE
  updateFilters(partial: Partial<FilterState>): void {
    /** Merge and update filters reactively. */
    this.filters.set({ ...this.filters(), ...partial });
  }
}
