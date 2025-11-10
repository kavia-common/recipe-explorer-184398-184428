export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

// PUBLIC_INTERFACE
export interface Recipe {
  /** Unique identifier for the recipe */
  id: string;
  /** Human-friendly name of the recipe */
  title: string;
  /** Short description for listing */
  description: string;
  /** URL for an image preview */
  imageUrl: string;
  /** Category such as Breakfast, Lunch, Dinner, Dessert, etc. */
  category: string;
  /** Dietary tags for filtering (e.g., vegan, gluten-free) */
  dietary: string[];
  /** Difficulty level */
  difficulty: Difficulty;
  /** Average rating from 1-5 */
  rating: number;
  /** Preparation time in minutes */
  prepTime: number;
  /** Cooking time in minutes */
  cookTime: number;
  /** List of ingredients */
  ingredients: string[];
  /** Step-by-step instructions */
  steps: string[];
  /** Optional nutrition data */
  nutrition?: NutritionInfo;
  /** Tags to show on detail page */
  tags?: string[];
  /** Similar recipe IDs for suggestions */
  similarIds?: string[];
}
